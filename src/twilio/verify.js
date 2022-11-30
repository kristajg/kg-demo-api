// twilio client
import { client } from '../utils/twilioClient';

// Create Verification Service
export const createVerificationService = async (friendlyName = 'My Verify Service') => {
  return await client.verify.v2.services
    .create({ friendlyName })
    .then(data => {
      console.log('Success creating Verification Service with ID: ', data.sid);
      return data;
    })
    .catch(err => {
      console.log('Error creating Verification Service ', err);
      return err;
    });
}

// Send the verfication code via channel requested. Defaults to SMS
export const sendVerificationCode = async (
  verificationSid = process.env.VERIFY_DEMO_SID, 
  to, 
  channel = 'sms',
  templateId,
  fromEmail
  ) => {
  const data = { to, channel };
  if (channel === 'voice') {
    // API expected 'call' value for voice OTP
    channel = 'call';
  }
  else if (channel === 'email' && templateId && fromEmail) {
    data.channelConfiguration = {
      template_id: templateId,
      from: fromEmail,
    }
  }
    
  return await client.verify.v2.services(verificationSid)
    .verifications
    .create(data)
    .then(data => {
      console.log('Success sending Verify code ', data);
      return data;
    })
    .catch(err => {
      console.log('Error sending Verify code ', err);
      return err;
    });
}

// Check if the user's input code matches the service code sent. Approve / deny
export const submitVerificationCode = async (verificationSid = process.env.VERIFY_DEMO_SID, to, code) => {
  return await client.verify.v2.services(verificationSid)
    .verificationChecks
    .create({ to, code })
    .then(data => {
      console.log('Success submiting Verify check: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error verifying user number code ', err);
      return err;
    });
}

export const checkVerification = async (verificationSid = process.env.VERIFY_DEMO_SID, to) => {
  return await client.verify.v2.services(verificationSid)
    .verificationChecks
    .create({ to })
    .then(data => {
      console.log('Successful Verification check: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error checking verification ', err);
      return err;
    });
}
