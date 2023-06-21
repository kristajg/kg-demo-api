const express = require('express');
const multer = require('multer');
const router = express.Router();

import { sendMessage, sendMMS, sendMessageByService, scheduleMessage, listMessages, listMessagingServices } from '../twilio/messages';
import { getFileExtension } from '../utils/utils';

// multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    // create tmp file for MMS
    let fileExt = getFileExtension(file.originalname);
    cb(null, 'tmp.' + fileExt);
  },
});
const upload = multer({ storage });

router.post('/send-message', (req, res) => {
  sendMessage(req.body)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err sending SMS message ', err);
      res.send('Error sending message');
    });
});

router.post('/send-mms', upload.single('mmsFile'), (req, res) => {
  const { toNumber, fromNumber, messageBody } = req.body;
  const fileName = '/tmp.' + getFileExtension(req.file.originalname);
  const mediaUrl = process.env.NGROK_BASE_URL + fileName;
  sendMMS(mediaUrl, toNumber, fromNumber, messageBody)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err sending MMS message ', err);
      res.send('Error sending MMS');
    });
})

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
    sendAt,
    to,
    scheduleType,
    statusCallback,
  } = req.body;
  scheduleMessage(messagingServiceSid, body, sendAt, to, scheduleType, statusCallback)
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

router.post('/list-messaging-services', (req, res) => {
  const { filterCriteria } = req.body;
  listMessagingServices(filterCriteria)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err getting messaging services ', err);
      res.send('Err getting messaging services');
    });
});

module.exports = router;
