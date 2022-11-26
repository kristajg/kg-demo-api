const { listAccountNumbers } = require(Runtime.getFunctions()["twilio/numbers"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    let { limit } = event;
    if (typeof limit == "string") limit = Number.parseInt(limit);

    let response = new Response();
    listAccountNumbers(client, limit)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error listing account's phone numbers ${err}`);
        return callback(response);
    })
}