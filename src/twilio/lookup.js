import { client } from '../utils/twilioClient';

export const getPhoneNumberLookup = async (phoneNumber = process.env.MY_PHONE_NUMBER) => {
  return await client.lookups.v2.phoneNumbers(phoneNumber)
    .fetch()
    .then(data => data)
    .catch(err => {
      console.log('Error looking up phone number: ', err);
      return err;
    });
}