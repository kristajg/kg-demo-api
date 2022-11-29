const { scheduleMessage } = require(Runtime.getFunctions()["twilio/messages"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
  const client = context.getTwilioClient();
  const { MESSAGE_SERVICE_DEMO_SID, DOMAIN_NAME } = context;
  let { body, sendAt, to, scheduleType, statusCallback } = event;
  statusCallback = statusCallback || `https://${DOMAIN_NAME}/message-callback`;
  let response = new Response();

  scheduleMessage(client, MESSAGE_SERVICE_DEMO_SID, body, sendAt, to, scheduleType, statusCallback)
  .then(data => {
    response = response.okResponse(data);
    return callback(null, response);
  })
  .catch(err => {
    response = response.badRequestResponse(`Error scheduling message ${err}`);
    return callback(response);
  });
}