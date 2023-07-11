// express
const express = require('express');
const router = express.Router();

// twilio functions
import { getPhoneNumberLookup } from '../twilio/lookup';

router.post('/get-lookup', (req, res) => {
  const { phoneNumber } = req.body;
  getPhoneNumberLookup(phoneNumber)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err on phone number lookup ', err);
      res.send('Err on phone number lookup ', err);
    });
});

module.exports = router;