const { phoneNumberLookup } = require(Runtime.getFunctions()['twilio/lookup'].path);
const Response = require(Runtime.getFunctions()['util/response'].path);

exports.handler = (context, event, callback) => {
  const client = context.getTwilioClient();
  const { phoneNumber, dataField, fieldOptions } = event; 
  let response = new Response();

  phoneNumberLookup(client, phoneNumber, dataField, fieldOptions)
  .then(contact => {
    response = response.okResponse(contact);
    return callback(null, response);
  })
  .catch(err => {
    response = response.badRequestResponse(err);
    return callback(response);
  })

}