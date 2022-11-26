const { listMessages } = require(Runtime.getFunctions()["twilio/messages"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { filterCriteria } = event;
    let response = new Response();

    listMessages(client, filterCriteria)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error getting account messages ${err}`);
        return callback(response);
    });
}