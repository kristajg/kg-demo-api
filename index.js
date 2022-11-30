require('dotenv').config();

import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import WebSocket from 'ws';

// route imports
const dialogflowRoutes = require('./src/routes/dialogflowRoutes.js');
const messageRoutes = require('./src/routes/messageRoutes.js');
const numberRoutes = require('./src/routes/numberRoutes.js');
const studioRoutes = require('./src/routes/studioRoutes.js');
const verifyRoutes = require('./src/routes/verifyRoutes.js');
const voiceRoutes = require('./src/routes/voiceRoutes.js');
const emailRoutes = require('./src/routes/emailRoutes.js');

// Uncomment next 3 lines to have a Twilio client for experimentation in index.js
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// route instantiation
app.use('/', dialogflowRoutes);
app.use('/', messageRoutes);
app.use('/', numberRoutes);
app.use('/', studioRoutes);
app.use('/', verifyRoutes);
app.use('/', voiceRoutes);
app.use('/', emailRoutes);

const server = http.createServer(app).listen(8009, () => {
  console.log('Express server listening on port 8009');
});

const wss = new WebSocket.Server({ server });

// Handle Web Socket Connection
let socket;
wss.on('connection', function connection(ws) {
  console.log('New Connection Initiated');
  socket = ws;

  ws.on('message', function message(data) {
    console.log('Message data received: ', data);
    ws.send('Hello back');
  });

  ws.onerror = function () {
    console.log('An Error occurred');
  }
});

app.get('/', (req, res) => {
  res.send('Test Twilio Sandbox is online!');
});

// Generic status callback endpoint for demos
app.post('/status-callback', (req, res) => {
  // console.log('status callback hit ', req.body);
  if (socket) {
    socket.send(JSON.stringify(req.body));
  } else {
    console.log('Socket not found');
  }
})

// Example data dip endpoint for studio, webhooks, etc
// - pulls posted value for key caller_number
// - mockCustomerData can be anything, customize it to your demo
// - if the caller_number is your phone number from env vars, we
// - pretend as if this was a match for customer data pulled from a db
app.post('/lookup-customer', (req, res) => {
  console.log('Lookup caller by number: ', req.body.caller_number);
  const { caller_number = '' } = req.body;
  let mockCustomerData = {
    is_customer: false,
    customer_id: null,
    customer_first_name: '',
    customer_balance: null,
  };
  // Mock data lookup: this would typically be a database query
  if (caller_number === process.env.MY_PHONE_NUMBER) {
    mockCustomerData = {
      is_customer: true,
      customer_id: 1,
      customer_first_name: 'Krista',
      customer_balance: '1 million dollars',
      assigned_agent_id: 1,
    };
  }
  return res.json(mockCustomerData);
})
