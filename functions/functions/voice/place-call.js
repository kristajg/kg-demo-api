const { placeCall } = require(Runtime.getFunctions()["twilio/voice"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { to, from, url, statusCallback } = event;
    const fromNumber = from || context.MY_PHONE_NUMBER;
    
    placeCall(client, to, fromNumber, url, statusCallback)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error placing call ${err}`);
        return callback(`Error placing call ${err}`);
    });
}