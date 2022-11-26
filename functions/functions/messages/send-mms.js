const { sendMMS } = require(Runtime.getFunctions()["twilio/messages"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { messageBody, mediaUrl, toNumber, fromNumber } = event;
    const from = fromNumber || context.MY_PHONE_NUMBER;
    let response = new Response();

    sendMMS(client, messageBody, mediaUrl, toNumber, from)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error sending MMS ${err}`);
        return callback(response);
    });
}