const { updateInProgressCall } = require(Runtime.getFunctions()["twilio/voice"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { callSid, twiml } = event;
    let response = new Response();

    updateInProgressCall(client, callSid, twiml)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error updating in progress call ${err}`);
        return callback(response);
    })
}