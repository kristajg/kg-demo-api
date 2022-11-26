const { placeCall } = require(Runtime.getFunctions()["twilio/voice"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { to, from, url, statusCallback } = event;
    const fromNumber = from || context.MY_PHONE_NUMBER;
    let response = new Response();

    placeCall(client, to, fromNumber, url, statusCallback)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error placing call ${err}`);
        return callback(response);
    });
}