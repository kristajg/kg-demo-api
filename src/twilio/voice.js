// twilio client
import { client } from '../utils/twilioClient';

export const placeCall = async callData => {
  const {
    to,
    from,
    twiml = '',
    url = '',
    statusCallback = process.env.NGROK_BASE_URL + '/status-callback',
    statusCallbackEvent = ['initiated', 'ringing', 'answered', 'completed'],
    recordCall = false,
    transcribeCall = false,
  } = callData;

  let callObj = {
    to,
    from,
    url: 'http://demo.twilio.com/docs/voice.xml',
    statusCallback,
    statusCallbackEvent,
  };
  // Can either use straight twiml, or url that returns twiml
  // if (twiml) {
  //   callObj.twiml = twiml;
  // }
  // if (url && !twiml) {
  //   callObj.url = url;
  // }

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
