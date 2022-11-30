const { checkVerification } = require(Runtime.getFunctions()['twilio/verify'].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
  const client = context.getTwilioClient();
  const verificationSid = context.VERIFY_DEMO_SID;
  const { to } = event;
  let response = new Response();

  checkVerification(client, verificationSid, to)
  .then(data => {
    response = response.okResponse(data);
    return callback(null, response);
  })
  .catch(err => {
    response = response.badRequestResponse(`Error checking verification ${err}`);
    return callback(response);
  });
}