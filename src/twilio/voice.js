// twilio client
import { client } from '../utils/twilioClient';

export const placeCall = async (to, from, url = 'http://demo.twilio.com/docs/voice.xml', statusCallback = '') => {
  return await client.calls.create({
      url,
      to,
      from,
      statusCallback,
    })
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
      console.log(`Error updating in progress call: ${err}`);
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
