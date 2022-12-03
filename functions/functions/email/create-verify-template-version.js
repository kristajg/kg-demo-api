const Response = require(Runtime.getFunctions()["util/response"].path);
const { createVerifyTemplateVersion } = require(Runtime.getFunctions()["twilio/email"].path);

exports.handler = (context, event, callback) => {
  const { SENDGRID_API_KEY } = context;
  const { templateId, name, subject } = event;
  let response = new Response();

  createVerifyTemplateVersion(SENDGRID_API_KEY, templateId, name, subject)
  .then( ([res, data]) => {
    response = response.okResponse(data);
    return callback(null, response);
  })
  .catch(err => {
    response = response.badRequestResponse(err);
    return callback(response);
  });
}