const { updateInProgressCall } = require(Runtime.getFunctions()["twilio/voice"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { callSid, twiml } = event;

    updateInProgressCall(client, callSid, twiml)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error updating in progress call ${err}`);
        return callback(`Error updating in progress call ${err}`);
    })
}