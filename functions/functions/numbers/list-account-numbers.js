const { listAccountNumbers } = require(Runtime.getFunctions()["twilio/numbers"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    let { limit } = event;
    if (typeof limit == "string") limit = Number.parseInt(limit);

    let response;
    listAccountNumbers(client, limit)
    .then(data => {
        response = Response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        console.log(`Error listing account's phone numbers ${err}`);
        response = Response.badRequestResponse(`Error listing account's phone numbers ${err}`);
        return callback(response);
    })
}