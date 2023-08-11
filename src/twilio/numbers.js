// twilio client
import { client } from '../utils/twilioClient';

export const listAvailableNumbers = async (country = 'US', type = 'local', areaCode = '', limit = 20) => {
  switch (type) {
    case 'local':
      return await client.availablePhoneNumbers(country)
        .local.list({
          areaCode,
          limit,
        })
        .then(data => {
          data.forEach(l => console.log('Local number ', l));
          return data;
        })
        .catch(err => {
          console.log(`Error fetching local numbers: ${err}`);
          return err;
        });
    case 'mobile':
      return await client.availablePhoneNumbers(country)
        .mobile
        .list({ limit })
        .then(data => {
          data.forEach(m => console.log('Mobile number ', m));
          return data;
        })
        .catch(err => {
          console.log(`Error fetching mobile numbers: ${err}`);
          return err;
        });
    case 'tollFree':
      return await client.availablePhoneNumbers(country)
        .tollFree
        .list({ limit })
        .then(data => {
          data.forEach(t => console.log('Toll free number ', t));
          return data;
        })
        .catch(err => {
          console.log('Error fetching toll free numbers: ', err);
          return err;
        });
    default:
      return;
  }
}

// TODO: purchase number
export const purchasePhoneNumber = () => {}

// get all owned numbers for an account by account SID
export const listAccountNumbers = async (limit) => {
  return await client.incomingPhoneNumbers
    .list({ limit })
    .then(data => {
      console.log('Success fetching account numbers ', data);
      return data;
    })
    .catch(err => {
      console.log('Error fetching account numbers: ', err);
      return err;
    });
}

export const submitTollFreeVerification = async (data) => {
  return await client.messaging.v1.tollfreeVerifications
    .create(data)
    .then(data => {
      console.log('Success submitting TFV request: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error submitting TFV request: ', err);
      return err;
    });
}

export const listAllTollFreeVerificationRecords = async (filterCriteria = { limit: 20 }) => {
  return await client.messaging.v1.tollfreeVerifications
    .list(filterCriteria)
    .then(data => {
      data.forEach(t => console.log(t.sid));
      return data;
    })
    .catch(err => {
      console.log('Error fetching list of TFV data: ', err);
      return err;
    });
}

export const getTollFreeVerificationRecord = async (tollfreeVerificationSID) => {
  return await client.messaging.v1.tollfreeVerifications(tollfreeVerificationSID)
    .fetch()
    .then(data => {
      console.log('TFV data: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error fetching single record of TFV data: ', err);
      return err;
    });
}
