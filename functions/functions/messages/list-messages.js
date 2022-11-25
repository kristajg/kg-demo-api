const { listMessages } = require(Runtime.getFunctions()["twilio/messages"].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { filterCriteria } = event;
    listMessages(client, filterCriteria)
    .then(data => callback(null, data))
    .catch(err => {
        console.log(`Error getting account messages ${err}`);
        return callback(`Error getting account messages ${err}`);
    });
}