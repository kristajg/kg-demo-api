const { createVerificationService } = require(Runtime.getFunctions()['twilio/verify'].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { friendlyName } = event; 
    let response = new Response();
    
    createVerificationService(client, friendlyName)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(err);
        return callback(response);
    });
}