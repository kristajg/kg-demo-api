// twilio client
import { client } from '../utils/twilioClient';
import { verificatioChannels } from '../utils/constants';

// Start API endpoint
// Sends 4 to 10 digit verification code via SMS, Voice, or Email & waits for response
export const sendVerificationCode = async (verificationSid, to, channel = 'sms') => {
  const validChannel = verificatioChannels.includes(channel);
  if (validChannel) {
    return await client.verify.services(verificationSid)
      .verifications
      .create({
        to,
        channel,
      })
      .then(data => {
        console.log('Verification success ', data);
        return data;
      })
      .catch(err => {
        console.log('Error submitting user number to begin verification process ', err);
        return err;
      });
  } else {
    throw `Invalid verification channel. Please use one of the following: ${verificatioChannels.join(", ")}.`;
  }
}

// Check API endpoints
// Checkts the user's input matches the code. Approve / deny
export const submitVerificationCode = (verificationSid, to, verificationCode) => {
  client.verify.services(verificationSid)
    .verificationChecks
    .create({
      to,
      code: verificationCode,
    })
    .then(data => {
      console.log(`Verification submit check: ${data}`);
      return data;
    })
    .catch(err => {
      console.log('Error verifying user number code ', err);
      return err;
    });
}
