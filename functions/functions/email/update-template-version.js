const Response = require(Runtime.getFunctions()["util/response"].path);
const { updateTemplateVersion } = require(Runtime.getFunctions()["twilio/email"].path);

exports.handler = (context, event, callback) => {
  const { SENDGRID_API_KEY } = context;
  const { templateId, versionId, active, name, subject, htmlContent } = event;
  let response = new Response();

  updateTemplateVersion(SENDGRID_API_KEY, templateId, versionId, active, name, subject, htmlContent)
  .then( ([res, data]) => {
    response = response.okResponse(data);
    return callback(null, response);
  })
  .catch(err => {
    response.badRequestResponse(err);
    return callback(response);
  });
}