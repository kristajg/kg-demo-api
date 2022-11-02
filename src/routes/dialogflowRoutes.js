const express = require('express');
const router = express.Router();

router.post('/dialogflow-status-callback', (req, res) => {
  console.log('Dialogflow status callback hit ', req.body);
  // const { friendlyName } = req.body;
  // createVerificationService(friendlyName)
  //   .then(data => res.json({ data }))
  //   .catch(err => {
  //     res.send(`Error creating verification service ${err}`);
  //   });
});

module.exports = router;
