#!/bin/bash

# Install HomeBrew if not installed 
if ! command -v brew >/dev/null 2>&1
then   
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "Home brew is installed"
fi 

# Install jq if not installed
if ! command -v jq >/dev/null 2>&1
then
    brew install jq 
else
    echo "JQ is installed"
fi 

# Install Twilio CLI if not installed 
if ! command -v twilio >/dev/null 2>&1
then
    brew tap twilio/brew && brew install twilio
else
    echo "Twilio cli is installed"
fi 

# Set Twilio and Sendgrid credentials for making Twilio API calls
while [ "$#" -gt 0 ];
do
    case "$1" in
        --account-sid)
            TWILIO_ACCOUNT_SID=$2
            shift
            ;;
        --auth-token)
            TWILIO_AUTH_TOKEN=$2
            shift
            ;;
        --sendgrid-api-key)
            SENDGRID_API_KEY=$2
            shift
            ;;
    esac
    shift
done 

#Ask user for Twilio or Sendgrid credentials not provided
if [ -z "$TWILIO_ACCOUNT_SID" ]
then
    echo "Please enter your Twilio Account Sid"
    read TWILIO_ACCOUNT_SID
fi
if [ -z "$TWILIO_AUTH_TOKEN" ]
then 
    echo "Please enter your Twilio Auth Token"
    read TWILIO_AUTH_TOKEN
fi
if [ -z "$SENDGRID_API_KEY" ]
then
    echo "Please enter your Sendgrid Api Key"
    read SENDGRID_API_KEY
fi

echo "Now creating required services for demo to work"

# Create dotenv file for project environment variables
touch functions/.env 
echo "TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID" >> functions/.env
echo "TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN" >> functions/.env 
echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> functions/.env

# Create Verify Demo Service
verifyServiceSid=$(curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "FriendlyName=Demo Quickstart Verify Service" \
--data-urlencode "UIEditable=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN | jq --raw-output '.sid')

echo "Created Verify Demo Service $verifyServiceSid"
echo "VERIFY_DEMO_SID=$verifyServiceSid" >> functions/.env

# Search for available phone number for Messaging Service
availablePhoneNumber=$(curl -G https://preview.twilio.com/Numbers/AvailableNumbers \
-d "Type=local" \
-d "Geography.IsoCountry=US" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN | jq --raw-output '.items[0] .phone_number')

echo "Found a local phone number $availablePhoneNumber"
echo "MY_PHONE_NUMBER=$availablePhoneNumber" >> functions/.env

# Purchase available phone number for Messaging Service 
phoneNumberSid=$(curl -X POST https://preview.twilio.com/Numbers/ActiveNumbers \
-d "PhoneNumber=$availablePhoneNumber" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN | jq --raw-output '.sid')

echo "Sid for purchased phone number $phoneNumberSid"

# Create Messaging Service, add purchased phone number to number pool
messagingService=$(curl -X POST "https://messaging.twilio.com/v1/Services" \
--data-urlencode "FriendlyName=Demo Quickstart Messaging Service" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN | jq --raw-output '.sid')

echo "Created Messaging Service $messagingService"
echo "MESSAGE_SERVICE_DEMO_SID=$messagingService" >> functions/.env

# Added purchased phone number to Messaging Service 
addedPhoneNumberToService=$(curl -X POST "https://messaging.twilio.com/v1/Services/$messagingService/PhoneNumbers" \
--data-urlencode "PhoneNumberSid=$phoneNumberSid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN )

# Update defaults for Messaging Service
defaultServiceConfigurationUpdate=$(curl -X POST "https://conversations.twilio.com/v1/Configuration" \
--data-urlencode "DefaultMessagingServiceSid=$messagingService" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN )

#Create Email Template for Verify Service
verifyEmailTemplate=$(curl -X POST "https://api.sendgrid.com/v3/templates" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "Content-Type: application/json" \
--data '{"name": "Verify OTP Demo", "generation": "dynamic"}' | jq --raw-output '.id')

echo "Created Dynamic Email Template for Verify Service"
echo "VERIFY_TEMPLATE_ID=$verifyEmailTemplate" >> functions/.env

# Store Verify Template HTML 
verifyTemplateHtml=`<html>
  <head>
    <style type="text/css">
      body, p, div {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
      }
      a {
        text-decoration: none;
      }
    </style>
    <title></title>
  </head>
  <body>
  <center>
    <p>
      Example 1 - just the code (no localization in the message):
    </p>
    <p>
      The verification code is: <strong>{{twilio_code}}</strong>
    </p>
    <p>
      Example 2 - use the code in a clickable link to trigger a verification check:
    </p>
    <p>
      <a href="https://your-company.com/signup/email/verify?token={{twilio_code}}" 
         style="background-color:#ffbe00; color:#000000; display:inline-block; padding:12px 40px 12px 40px; text-align:center; text-decoration:none;" 
         target="_blank">Verify Email Now</a>
    </p>
    <p>
      Example 3 - entire localized message and code:
    </p>
    <p>
      <strong>{{twilio_message}}</strong>
    </p>
    <p><a href="https://sendgrid.com/blog/open-source-transactional-email-templates/">Check out more templates</a></p>
    <span style="font-size: 10px;"><a href=".">Email preferences</a></span>
  </center>
  </body>
</html>`

#Create Verify Template Version
verifyTemplateVersion=$(curl -X POST "https://api.sendgrid.com/v3/templates/$verifyEmailTemplate/versions" \
--header "Authorization: Bearer $SENDGRID_API_KEY" \
--header "on-behalf-of: The subuser's username. This header generates the API call as if the subuser account was making the call." \
--header "Content-Type: application/json" \
--data `{"template_id": "$verifyEmailTemplate", "active": 1, "name": "Verify OTP Demo", "html_content": "$verifyTemplateHtml", "subject": "Verify Demo One Time Passcode"}`)

echo "Created Verify Template Version $verifyTemplateVersion"

#Navigate to functions directory and deploy them to Twilio Serverless
cd functions && twilio serverless:deploy --env .env



