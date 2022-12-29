const Response = require(Runtime.getFunctions()["util/response"].path);
const { createTemplateVersion } = require(Runtime.getFunctions()["twilio/email"].path);

exports.handler = (context, event, callback) => {
  const { SENDGRID_API_KEY } = context;
  const { templateId, name, subject, active, htmlContent } = event;
  let response = new Response();

  createTemplateVersion(SENDGRID_API_KEY, templateId, name, subject, active, htmlContent)
  .then(([res, data]) => {
    response = response.okResponse(data);
    return callback(null, response);
  })
  .catch(err => {
    response.badRequestResponse(err);
    return callback(response);
  });
}