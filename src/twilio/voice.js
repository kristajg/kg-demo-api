// twilio client
import { client } from '../utils/twilioClient';

export const placeCall = async (
  to,
  from,
  twiml = '<Response><Say>Thanks for calling the demo app. Lets just hang out and relax while we consider our lives.</Say></Response>',
  url = '', 
  statusCallback = 'https://kaygee.ngrok.io/status-callback',
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
    .then(call => {
      console.log(call.sid);
      return call;
    })
    .catch(err => {
      console.log(`Error placing call: ${err}`);
      return err;
    });
}

export const updateInProgressCall = async (
  callSID,
  twiml = '<Response><Say>Ahoy there</Say></Response>',
) => {
  return await client.calls(callSID)
    .update({ twiml })
    .then(call => {
      console.log('Updated in progress call: ', call);
      return call;
    })
    .catch(err => {
      console.log('Error updating in progress call: ', err);
      return err;
    });
}

export const fetchVoicemailTranscriptionBySid = async transcriptionSid => {
  return await client.transcriptions(transcriptionSid)
    .fetch()
    .then(data => {
      console.log('Transcription data is: ', data);
      return data;
    })
    .catch(err => {
      console.log('Transcription failed due to error: ', err);
      return err;
    });
}
