const { sendMessage } = require(Runtime.getFunctions()["twilio/messages"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    console.log("we called the function");
    const client = context.getTwilioClient();
    const { messageBody, toNumber, fromNumber } = event;
    const from = fromNumber || context.MY_PHONE_NUMBER;
    let response = new Response();

    sendMessage(client, messageBody, toNumber, from)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error sending SMS message ${err}`);
        return callback(response);
    });
}