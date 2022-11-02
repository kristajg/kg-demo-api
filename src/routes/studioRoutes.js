const express = require('express');
const router = express.Router();

// twilio functions
import { executeStudioFlow } from '../twilio/studio';

router.post('/execute-studio-flow', (req, res) => {
  const { studioFlowId, to, from, parameters } = req.body;
  executeStudioFlow(studioFlowId, to, from, parameters)
    .then(data => res.json({ data }))
    .catch(err => {
      res.send(`Error executing studio flow ${err}`);
    });
});

module.exports = router;
