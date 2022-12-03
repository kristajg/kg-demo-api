const { createDynamicTemplate } = require(Runtime.getFunctions()["twilio/email"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
  const { SENDGRID_API_KEY } = context;
  const { name } = event;
  let response = new Response();

  createDynamicTemplate(SENDGRID_API_KEY, name)
  .then( ([res, data]) => {
    response = response.okResponse(data);
    return callback(null, response);
  })
  .catch(err => {
    response.badRequestResponse(err);
    return callback(response);
  });
}