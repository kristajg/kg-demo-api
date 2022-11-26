const { sendMessageByService } = require(Runtime.getFunctions()["twilio/messages"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { MESSAGE_SERVICE_DEMO_SID } = context;
    const { messageBody, toNumber, fromNumber } = event;
    let response = new Response();

    sendMessageByService(client, MESSAGE_SERVICE_DEMO_SID, messageBody, toNumber, fromNumber)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error sending Messaging Service message ${err}`);
        return callback(response);
    });
}