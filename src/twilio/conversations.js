// twilio client
import { client } from '../utils/twilioClient';

export const createConversation = async (conversationName = 'New Conversation') => {
  return await client.conversations.conversations
    .create({ friendlyName: conversationName })
    .then(data => {
      console.log(`Conversation created: ${data}`);
      return data;
    })
    .catch(err => {
      console.log(`Err creating conversation: ${err}`);
      return err;
    })
}

export const fetchConversation = async conversationSid => {
  return await client.conversations.conversations(conversationSid)
    .fetch()
    .then(data => {
      console.log(`Conversation: ${data}`);
      return data;
    })
    .catch(err => {
      console.log(`Err fetching conversation: ${err}`);
      return err;
    });
}

export const addConversationParticipant = async (conversationSid, twilioNumber, participantNumber) => {
  return await client.conversations.conversations(conversationSid)
    .participants
    .create({
      'messagingBinding.address': participantNumber,
      'messagingBinding.proxyAddress': twilioNumber,
    })
    .then(participant => {
      console.log('Participant added: ', participant.sid);
      return participant;
    })
    .catch(err => {
      console.log('Err adding conversation particpant ', err);
      return err;
    })
}

export const deleteConversation = async conversationSid => {
  return await client.conversations.v1.conversations(conversationSid)
    .remove()
    .then(data => {
      console.log('Conversation removed: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error removing conversation: ', err);
      return err;
    })
}
