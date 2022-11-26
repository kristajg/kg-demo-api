const { sendVerificationCode } = require(Runtime.getFunctions()['twilio/verify'].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const verificationSid = context.VERIFY_DEMO_SID;
    const { to, channel } = event;
    let response = new Response();

    sendVerificationCode(client, verificationSid, to, channel)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(err);
        return callback(response);
    });
}