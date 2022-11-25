const { sendMMS } = require(Runtime.getFunctions()["twilio/messages"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { messageBody, mediaUrl, toNumber, fromNumber } = event;
    const from = fromNumber || context.MY_PHONE_NUMBER;
    sendMMS(client, messageBody, mediaUrl, toNumber, from)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error sending MMS ${err}`);
        return callback(`Error sending MMS ${err}`);
    });
}