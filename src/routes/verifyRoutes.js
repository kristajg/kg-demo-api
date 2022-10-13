const express = require('express');
const router = express.Router();

// twilio functions
import {
  createVerificationService,
  sendVerificationCode,
  submitVerificationCode,
} from '../twilio/verify';

router.post('/create-verification-service', (req, res) => {
  const { friendlyName } = req.body;
  createVerificationService(friendlyName)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error creating verification service ${err}`);
    });
});

router.post('/send-verification-code', (req, res) => {
  const { verificationSid, toNumber, channel } = req.body;
  sendVerificationCode(verificationSid, toNumber, channel)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error sending verification code ${err}`);
    });
});

router.post('/submit-verification-code', (req, res) => {
  const { verificationSid, toNumber, code } = req.body;
  submitVerificationCode(verificationSid, toNumber, code)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error submitting verification code ${err}`);
    });
});

module.exports = router;
