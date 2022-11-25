const { sendMessageByService } = require(Runtime.getFunctions()["twilio/messages"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { MESSAGE_SERVICE_DEMO_SID } = context;
    const { messageBody, toNumber, fromNumber } = event;
    sendMessageByService(client, MESSAGE_SERVICE_DEMO_SID, messageBody, toNumber, fromNumber)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error sending Messaging Service message ${err}`);
        return callback(null, `Error sending Messaging Service message ${err}`);
    });
}