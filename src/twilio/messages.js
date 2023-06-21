// twilio client
import { client } from '../utils/twilioClient';
import { getFutureTimeInMins } from '../utils/utils';

// Send one SMS
export const sendMessage = async (body, to, from, statusCallback = '') => {
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
      console.log('Error sending SMS: ', err);
      return err;
    });
}

// Send one MMS
export const sendMMS = async (mediaUrl, to, from, messageBody = 'Demo MMS') => {
  return await client.messages.create({
      from,
      to,
      mediaUrl: [mediaUrl],
      body: messageBody,
    })
    .then(message => {
      console.log('MMS message sent: ', message.sid);
      return message;
    })
    .catch(err => {
      console.log('Error sending MMS: ', err);
      return err;
    });
}

// Send message from Messaging Service
export const sendMessageByService = async (messagingServiceSid = process.env.MESSAGE_SERVICE_DEMO_SID, body, to, shortenUrls = false,) => {
  return await client.messages.create({
      messagingServiceSid,
      body,
      to,
      shortenUrls,
    })
    .then(message => {
      console.log('Messaging service message sent: ', message);
      return message;
    })
    .catch(err => {
      console.log('Error sending messaging service message: ', err);
      return err;
    })
}

// List all SMS for an account, optional filter
export const listMessages = async (filterCriteria = { limit: 20 }) => {
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
export const scheduleMessage = async (
  messagingServiceSid = process.env.MESSAGE_SERVICE_DEMO_SID,
  body,
  sendAt = getFutureTimeInMins(15), // default Twilio msg schedule must be 15 mins future minimum
  to,
  scheduleType = 'fixed',
  statusCallback = 'https://kaygee.ngrok.io/status-callback',
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

// List all Messaging Services
export const listMessagingServices = async (filterCriteria = { limit: 20 }) => {
  return await client.messaging.v1.services
    .list(filterCriteria)
    .then(services => {
      services.forEach(s => console.log(s));
      return services;
    })
    .catch(err => {
      console.log('Error fetching messaging services ', err);
      return err;
    });
}
