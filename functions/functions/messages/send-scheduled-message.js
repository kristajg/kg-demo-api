const { scheduleMessage } = require(Runtime.getFunctions()["twilio/messages"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { MESSAGE_SERVICE_DEMO_SID } = context;
    const { body, sendAt, to, scheduleType, statusCallback } = event;
    scheduleMessage(client, MESSAGE_SERVICE_DEMO_SID, body, sendAt, to, scheduleType, statusCallback)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error scheduling message ${err}`);
        return callback(`Error scheduling message ${err}`);
    });
}