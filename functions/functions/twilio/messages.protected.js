// twilio client
const { getFutureTimeInMins } = require(Runtime.getFunctions()['util/utils'].path);

// Send one SMS
const sendMessage = async (client, body, to, from, statusCallback = '') => {
  return await client.messages.create({
      to,
      from,
      body,
      statusCallback,
    })
    .then(message => {
      console.log('SMS message sent: ', message.sid);
      return message;
    })
    .catch(err => {
      console.log(`Error sending SMS: ${err}`);
      return err;
    });
}

// Send one MMS
const sendMMS = async (client, body, mediaUrl, to, from) => {
  return await client.messages.create({
      body,
      from,
      to,
      mediaUrl,
    })
    .then(message => {
      console.log(`MMS message sent: ${message.sid}`);
      return message;
    })
    .catch(err => {
      console.log(`Error sending MMS: ${err}`);
      return err;
    });
}

// Send message from Messaging Service
const sendMessageByService = async (client, messagingServiceSid = process.env.MESSAGE_SERVICE_DEMO_SID, body, to, from) => {
  return await client.messages.create({
      messagingServiceSid,
      body,
      from,
      to,
    })
    .then(message => {
      console.log(`Messaging service message sent: ${message.sid}`);
      return message;
    })
    .catch(err => {
      console.log(`Error sending messaging service message: ${err}`);
      return err;
    })
}

// List all SMS for an account, optional filter
const listMessages = async (client, filterCriteria = { limit: 20 }) => {
  return await client
    .messages.list(filterCriteria)
    .then(messages => {
      messages.forEach(m => console.log(m));
      return messages;
    })
    .catch(err => {
      console.log(`Error getting message list: ${err}`);
      return err;
    });
}

// Schedule a message to send in the future (minimum 15 mins currently)
const scheduleMessage = async (
  client,
  messagingServiceSid = process.env.MESSAGE_SERVICE_DEMO_SID,
  body,
  sendAt = getFutureTimeInMins(15), // default Twilio msg schedule must be 15 mins future minimum
  to,
  scheduleType = 'fixed',
  statusCallback = 'http://localhost:8000/schedule-message-callback',
) => {
  return await client.messages.create({
      messagingServiceSid,
      body,
      sendAt,
      scheduleType,
      statusCallback,
      to,
    })
    .then(message => {
      console.log(`SMS successfully scheduled to be sent: ${message.sid}`);
      return message;
    })
    .catch(err => {
      console.log('Error sending scheduled message: ', err);
      return err;
    });
}

module.exports = {
    sendMessage,
    sendMMS,
    sendMessageByService,
    scheduleMessage,
    listMessages,
}
