// twilio client
import { client } from '../utils/twilioClient';

// see available phone numbers
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
          console.log(`Error fetching toll free numbers: ${err}`);
          return err;
        });
    default:
      return;
  }
}

// TODO: purchase number
export const purchasePhoneNumber = () => {}

// get all numbers for an account by account SID
export const listAccountNumbers = async (limit) => {
  return await client.incomingPhoneNumbers
    .list({ limit })
    .then(data => data)
    .catch(err => {
      console.log(`Error fetching account numbers: ${err}`);
      return err;
    });
}

