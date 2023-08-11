import { client } from '../utils/twilioClient';

export const fetchAccountResource = async (accountSID = process.env.TWILIO_ACCOUNT_SID) => {
  return await client.api.v2010.accounts(accountSID)
    .fetch()
    .then(data => {
      console.log('Account resource data: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error fetching account resource: ', err);
      return err;
    });
}
