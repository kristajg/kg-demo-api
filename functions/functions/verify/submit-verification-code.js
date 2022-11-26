const { submitVerificationCode } = require(Runtime.getFunctions()['twilio/verify'].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const verificationSid = context.VERIFY_DEMO_SID;
    const { to, code } = event;
    let response = new Response();

    submitVerificationCode(client, verificationSid, to, code)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error submitting verification code ${err}`);
        return callback(response);
    })
}