const placeCall = async (
  client,
  to,
  from,
  twiml = '<Response><Say>Thanks for calling the demo app. Lets just hang out and relax while we consider our lives.</Say></Response>',
  url = '', 
  statusCallback = process.env.NGROK_BASE_URL + '/status-callback',
  statusCallbackEvent = ['initiated', 'ringing', 'answered', 'completed'],
) => {
  let callObj = {
    to,
    from,
    statusCallback,
    statusCallbackEvent,
  };
  // Can either use straight twiml, or url that returns twiml
  if (twiml) {
    callObj.twiml = twiml;
  }
  if (url && !twiml) {
    callObj.url = url;
  }
  return await client.calls.create(callObj)
    .then(call => call)
    .catch(err => err);
}

const updateInProgressCall = async (
  client,
  callSID,
  twiml = '<Response><Say>Ahoy there</Say></Response>',
) => {
  return await client.calls(callSID)
    .update({ twiml })
    .then(call => call)
    .catch(err => err);
}

const fetchVoicemailTranscriptionBySid = async (client, transcriptionSid) => {
  return await client.transcriptions(transcriptionSid)
    .fetch()
    .then(data => data)
    .catch(err => err);
}

module.exports = {
  placeCall,
  updateInProgressCall,
  fetchVoicemailTranscriptionBySid,
}