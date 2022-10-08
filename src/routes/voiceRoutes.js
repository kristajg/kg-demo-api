// express
const express = require('express');
const router = express.Router();

// twilio functions
import { placeCall } from '../twilio/voice';

router.post('/place-call', (req, res) => {
  const { toNumber, fromNumber, url, statusCallback } = req.body;
  placeCall(toNumber, fromNumber, url, statusCallback)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err placing call ', err);
      res.send(`Error placing call ${err}`);
    });
});

module.exports = router;

