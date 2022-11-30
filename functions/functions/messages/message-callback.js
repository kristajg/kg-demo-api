const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
  let response = new Response();
  console.log('sms-callback event data: ', event);
  response = response.okResponse('called the sms callback');
  return callback(null, response);
}