// Create Verification Service
const createVerificationService = async (client, friendlyName = 'My Verify Service') => {
  return await client.verify.v2.services
    .create({ friendlyName })
    .then(data => data)
    .catch(err => err);
}

// Send the verfication code via channel requested. Defaults to SMS
const sendVerificationCode = async (client, verificationSid = process.env.VERIFY_DEMO_SID, to, channel = 'sms') => {
  if (channel === 'voice') {
    // API expected 'call' value for voice OTP
    channel = 'call';
  }
  return await client.verify.v2.services(verificationSid)
    .verifications
    .create({ to, channel })
    .then(data => data)
    .catch(err => err);
}

// Check if the user's input code matches the service code sent. Approve / deny
const submitVerificationCode = async (client, verificationSid = process.env.VERIFY_DEMO_SID, to, code) => {
  return await client.verify.v2.services(verificationSid)
    .verificationChecks
    .create({ to, code })
    .then(data => data)
    .catch(err => err);
}

const checkVerification = async (client, verificationSid = process.env.VERIFY_DEMO_SID, to) => {
  return await client.verify.v2.services(verificationSid)
    .verificationChecks
    .create({ to })
    .then(data => data)
    .catch(err => err);
}

module.exports = {
  createVerificationService,
  sendVerificationCode,
  submitVerificationCode,
  checkVerification,
}


