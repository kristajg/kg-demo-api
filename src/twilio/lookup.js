import { client } from '../utils/twilioClient';

/**
 * 
 * @param {string} phoneNumber phone number to be looked up
 * @param {'line_type_intelligence' | 'sim_swap' | 'caller_name' | 'identity_match'} dataField type of additional data requested for phone number 
 * @param {*} fieldOptions additional filter parameters for phone number query
 * @returns 
 */
const phoneNumberLookup = (phoneNumber, dataField = 'line_type_intelligence', fieldOptions = {}) => {
  return client.lookups.v2.phoneNumbers(phoneNumber)
  .fetch({ fields: dataField, ...fieldOptions})
  .then(contact => {
    return contact;
  })
  .catch(err => {
    return err;
  })
}

module.exports = {
  phoneNumberLookup,
}