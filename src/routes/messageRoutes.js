// express
const express = require('express');
const router = express.Router();

// twilio functions
import { sendMessage, sendMMS, sendMessageByService, scheduleMessage, listMessages } from '../twilio/messages';

router.post('/send-message', (req, res) => {
  const { messageBody, toNumber, fromNumber } = req.body;
  sendMessage(messageBody, toNumber, fromNumber)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err sending SMS message ', err);
      res.send('Error sending message');
    });
});

router.post('/send-mms', (req, res) => {
  const { messageBody, mediaUrl, toNumber, fromNumber } = req.body;
  sendMMS(messageBody, mediaUrl, toNumber, fromNumber)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err sending MMS message ', err);
      res.send('Error sending MMS');
    });
});

router.post('/send-message-by-service', (req, res) => {
  const { messageBody, messagingServiceSId, toNumber, fromNumber } = req.body;
  sendMessageByService(messagingServiceSId, messageBody, toNumber, fromNumber)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err sending messaging service message ', err);
      res.send('Error sending messaging service message');
    });
});

router.post('/send-scheduled-message', (req, res) => {
  const {
    messagingServiceSid,
    body,
    dateTimeToSend,
    to,
    scheduleType,
    statusCallback,
  } = req.body;
  scheduleMessage(messagingServiceSId, body, dateTimeToSend, to, scheduleType, statusCallback)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err sending scheduled message ', err);
      res.send('Error sending scheduled message');
    });
});

router.post('/list-messages', (req, res) => {
  const { filterCriteria } = req.body;
  listMessages(filterCriteria)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err getting account messages ', err);
      res.send('Err getting account messages');
    });
});

module.exports = router;
