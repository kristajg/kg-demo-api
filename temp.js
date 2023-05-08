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
