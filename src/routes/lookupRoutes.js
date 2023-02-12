const express = require('express');
const router = express.Router();

const { phoneNumberLookup } = require('../twilio/lookup');


router.post('/lookup/fetch-phone-number', (req, res) => {
  const { phoneNumber, dataField, fieldOptions } = req.body;

  phoneNumberLookup(phoneNumber, dataField, fieldOptions)
  .then(data => {
    return res.status(200).json({data}).send();
  })
  .catch(err => {
    return res.status(400).json(err).send()
  })
})


module.exports = router;