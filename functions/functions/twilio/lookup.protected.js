const phoneNumberLookup = (client, phoneNumber, dataField = 'line_type_intelligence', fieldOptions = {}) => {
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