const { submitVerificationCode } = require(Runtime.getFunctions()['twilio/verify'].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const verificationSid = context.VERIFY_DEMO_SID;
    const { to, code } = event;

    submitVerificationCode(client, verificationSid, to, code)
    .then(data => callback(null, data))
    .catch(err => callback(`Error submitting verification code ${err}`))
}