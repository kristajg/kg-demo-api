const { createVerificationService } = require(Runtime.getFunctions()['twilio/verify'].path);

exports.handler = (context, event, callback) => {
    const client = context.getTwilioClient();
    const { friendlyName } = event; 
    
    createVerificationService(client, friendlyName)
    .then(data => callback(null, data))
    .catch(err => callback(err));
}