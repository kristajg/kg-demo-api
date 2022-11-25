const { checkVerification } = require(Runtime.getFunctions()['twilio/verify'].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const verificationSid = context.VERIFY_DEMO_SID;
    const { to } = event;

    checkVerification(client, verificationSid, to)
    .then(data => callback(null, data))
    .catch(err => callback(`Error checking verification ${err}`));
}