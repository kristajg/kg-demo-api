// express
const express = require('express');
const router = express.Router();

// twilio functions
import { placeCall, updateInProgressCall } from '../twilio/voice';

router.post('/place-call', (req, res) => {
  const { to, from, url, statusCallback } = req.body;
  placeCall(to, from, url, statusCallback)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err placing call ', err);
      res.send(`Error placing call ${err}`);
    });
});

router.post('/update-in-progress-call', (req, res) => {
  const { callSID, twiml } = req.body;
  updateInProgressCall(callSID, twiml)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err updating call ', err);
      res.send(`Error updating call ${err}`);
    });
});

module.exports = router;

