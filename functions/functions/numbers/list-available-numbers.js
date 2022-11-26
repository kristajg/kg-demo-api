const { listAvailableNumbers } = require(Runtime.getFunctions()["twilio/numbers"].path);
const Response = require(Runtime.getFunctions()["util/response"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    let { country, type, areaCode, limit } = event;
    if (typeof limit == 'string') limit = Number.parseInt(limit);
    
    let response = new Response();
    listAvailableNumbers(client, country, type, areaCode, limit)
    .then(data => {
        response = response.okResponse(data);
        return callback(null, response);
    })
    .catch(err => {
        response = response.badRequestResponse(`Error fetching available phone numbers ${err}`);
        return callback(response);
    });
}