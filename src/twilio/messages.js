// twilio client
import { client } from '../utils/twilioClient';
import { getFutureTimeInMins } from '../utils/utils';

// Send a message by either phone number or service
export const sendMessage = async ({
  to = '',
  from = '',
  messagingServiceSid = '',
  body = '',
  statusCallback = process.env.NGROK_BASE_URL + '/status-callback',
  sendAt = '',
  scheduleType = 'fixed',
}) => {
  const data = {
    to,
    from,
    messagingServiceSid,
    body,
    statusCallback,
    sendAt,
    scheduleType,
  };
  
  // Can send by either individual phone number or Messaging Service Sid (prioritize)
  if (messagingServiceSid) delete data.from
  if (from && !messagingServiceSid) delete data.messagingServiceSid;

  // Can schedule for (minimum) 15 mins and (maximum) 7 days in the future
  if (!sendAt) {
    delete data.sendAt;
    delete data.scheduleType;
  }

  return await client.messages.create(data)
    .then(message => {
      console.log('Message sent: ', message.sid);
      return message;
    })
    .catch(err => {
      console.log('Error sending message: ', err);
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

// Schedule a message to send in the future (minimum 15 mins currently)
export const scheduleMessage = async (
  messagingServiceSid = process.env.MESSAGE_SERVICE_DEMO_SID,
  body,
  sendAt = getFutureTimeInMins(15), // default Twilio msg schedule must be 15 mins future minimum
  to,
  scheduleType = 'fixed',
  statusCallback = process.env.NGROK_BASE_URL + '/status-callback',
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
      console.log('SMS successfully scheduled to be sent: ', message.sid);
      return message;
    })
    .catch(err => {
      console.log('Error sending scheduled message: ', err);
      return err;
    });
}

// List all SMS for an account, optional filter
export const listMessages = async (filterCriteria = { limit: 20 }) => {
  return await client
    .messages.list(filterCriteria)
    .then(messages => {
      return messages;
    })
    .catch(err => {
      console.log(`Error getting message list: ${err}`);
      return err;
    });
}

// List all Messaging Services, optional filter
export const listMessagingServices = async (filterCriteria = { limit: 20 }) => {
  return await client.messaging.v1.services
    .list(filterCriteria)
    .then(services => {
      return services;
    })
    .catch(err => {
      console.log('Error fetching messaging services ', err);
      return err;
    });
}

// Intercept an opt-out, store in mock db
export const detectOptOut = data => {
  // TODO: Look for OptOutType in data payload. Listen on inbound webhook
  // Note: will only be avail if number is in Messaging Service
  console.log('data in detect opt out ', data);
}
