const { sendVerificationCode } = require(Runtime.getFunctions()['twilio/verify'].path);
// 
exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const verificationSid = context.VERIFY_DEMO_SID;
    const { to, channel } = event;
    console.log('client => ', client);
    sendVerificationCode(client, verificationSid, to, channel)
    .then(data => callback(null, data))
    .catch(err => callback(`Error sending verification code ${err}`));
}