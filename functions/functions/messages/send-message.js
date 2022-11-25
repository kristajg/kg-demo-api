const { sendMessage } = require(Runtime.getFunctions()["twilio/messages"].path);

exports.handler = (context, event, callback) => {
    console.log("we called the function");
    const client = context.getTwilioClient();
    const { messageBody, toNumber, fromNumber } = event;
    const from = fromNumber || context.MY_PHONE_NUMBER;
    console.log("we made it to the send message method");
    sendMessage(client, messageBody, toNumber, from)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error sending SMS message ${err}`);
        return callback(`Error sending SMS message${err}`);
    });
}