const express = require('express');
const router = express.Router();

// twilio functions
import {
  checkVerification,
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
  const { verificationSid, to, channel } = req.body;
  sendVerificationCode(verificationSid, to, channel)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error sending verification code ${err}`);
    });
});

router.post('/submit-verification-code', (req, res) => {
  const { verificationSid, to, code } = req.body;
  submitVerificationCode(verificationSid, to, code)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error submitting verification code ${err}`);
    });
});

router.post('/check-verification', (req, res) => {
  const { verificationSid, to } = req.body;
  checkVerification(verificationSid, to)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error checking verification ${err}`);
    });
});

module.exports = router;
