require('dotenv').config();

// 3rd party libraries
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';

// route imports
const messageRoutes = require('./src/routes/messageRoutes.js');
const verifyRoutes = require('./src/routes/verifyRoutes.js');
const voiceRoutes = require('./src/routes/voiceRoutes.js');

// helpers
import { scrubDialogFlowText } from './src/utils/utils';

// constants
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// twilio imports
// const client = require('twilio')(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// route instantiation
app.use('/', messageRoutes);
app.use('/', verifyRoutes);
app.use('/', voiceRoutes);

// home route
app.get('/', (req, res) => {
  res.send('Test Twilio Sandbox is online!');
});

// status callback for demos
app.post('/status-callback', (req, res) => {
  console.log('status callback hit ', req.body);
})

// data dip example for studio, webhooks, etc
app.post('/lookup-customer', (req, res) => {
  console.log('Lookup caller by number: ', req.body.caller_number);
  const { caller_number = '' } = req.body;
  const customer = {
    is_customer: false,
    customer_id: null,
    customer_first_name: '',
    customer_balance: null,
  };
  // Only looking up my own number for demo purposes
  // Otherwise this would be a database query
  if (caller_number === process.env.MY_PHONE_NUMBER) {
    customer = {
      is_customer: true,
      customer_id: 1,
      customer_first_name: 'Krista',
      customer_balance: '1 million dollars',
      assigned_agent_id: 1,
    };
  }
  console.log('Customer result: ', customer);
  return res.json(customer);
})


// START SCHEDULE MESSAGES TEST
// let dateTime = new Date("July 25, 2022 14:00:00");
// console.log('dateTime is ', dateTime.toISOString());

// ISO 8601 format:
// YYYY-MM-DDTHH:mm:ss.sssZ
// ex: 2022-07-25T18:43:39.361Z

// client.messages
//   .create({
//       messagingServiceSid: process.env.MESSAGE_SERVICE_DEMO_SID,
//       body: 'This is a scheduled message!!',
//       sendAt: dateTime.toISOString(),
//       scheduleType: 'fixed',
//       statusCallback: 'https://kaygee.ngrok.io/status-callback',
//       to: process.env.MY_PHONE_NUMBER
//     })
//   .then(message => {
//     console.log('Scheduled msg ', message);
//   });
// END SCHEDULE MESSAGES TEST




/*
 * Start HEALTHCARE + DIALOGFLOW DEMO CODE
 */ 
// Global variables in lieu of a real database
let doctorId = '';
let memberId = '';
let backupDoctorId = 'a b c 1 2 3';
let backupMemberId = '5 4 3 2 1';

// Dialogflow fullfilment webhook
app.post('/dialogflow-fulfillment-webhook', (req, res) => {
  return res.json({
    fulfillmentText: `Perfect, thank you`,
    end_interaction: true,
  });
});

// Capture dialogflow data in callback and set to local variables
app.post('/healthcare-service', (req, res) => {
  const {
    query: {
      step = '',
    },
    body: {
      QueryText = '',
    },
  } = req;

  console.log('Dialogflow text is ', QueryText);

  if (QueryText) {
    let dialogFlowData = scrubDialogFlowText(QueryText);
    if (step === 'doctorid') {
      doctorId = dialogFlowData;
    }
    if (step === 'memberid') {
      memberId = dialogFlowData;
    }
  } else {
    // Fallback for demo
    if (step === 'doctorid') {
      doctorId = backupDoctorId;
    }
    if (step === 'memberid') {
      memberId = backupMemberId;
    }
  }
});

// Return healthcare service data to studio flow
app.post('/confirm-healthcare-service-data', (req, res) => {
  const { step } = req.query;
  let payload = {};
  if (step === 'doctorid') {
    payload = { doctorid: doctorId };
  }
  if (step === 'memberid') {
    payload = { memberid: memberId };
  }
  res.json(payload);
});
/*
 * End HEALTHCARE + DIALOGFLOW DEMO CODE
 */

http.createServer(app).listen(8009, () => {
  console.log('Express server listening on port 8009');
});
