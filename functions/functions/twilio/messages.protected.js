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
  .then(message => message)
  .catch(err => err);
}

// Send one MMS
const sendMMS = async (client, body, mediaUrl, to, from) => {
  return await client.messages.create({
    body,
    from,
    to,
    mediaUrl,
  })
  .then(message => message)
  .catch(err => err);
}

// Send message from Messaging Service
const sendMessageByService = async (client, messagingServiceSid = process.env.MESSAGE_SERVICE_DEMO_SID, body, to, from) => {
  return await client.messages.create({
    messagingServiceSid,
    body,
    from,
    to,
  })
  .then(message => message)
  .catch(err => err)
}

// List all SMS for an account, optional filter
const listMessages = async (client, filterCriteria = { limit: 20 }) => {
  return await client
    .messages.list(filterCriteria)
    .then(messages => messages)
    .catch(err => err);
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
  .then(message => message)
  .catch(err => err);
}

module.exports = {
  sendMessage,
  sendMMS,
  sendMessageByService,
  scheduleMessage,
  listMessages,
}
