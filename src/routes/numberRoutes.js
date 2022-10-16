// express
const express = require('express');
const router = express.Router();

// twilio functions
import { listAvailableNumbers, listAccountNumbers } from '../twilio/numbers';

router.post('/list-available-numbers', (req, res) => {
  const { country, type, areaCode, limit } = req.body;
  listAvailableNumbers(country, type, areaCode, limit)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err fetching available numbers ', err);
      res.send('Err fetching available numbers');
    });
});

router.post('/list-account-numbers', (req, res) => {
  const { limit } = req.body;
  listAccountNumbers(limit)
    .then(data => res.json({ data }))
    .catch(err => {
      console.log('Err fetching account numbers ', err);
      res.send('Err fetching account numbers');
    });
});
