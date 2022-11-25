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

# Set Credentials for making Twilio API calls
while getopts ":a:b:c:" OPTION 
do
    case $OPTION in
        a) 
            echo "account sid present"
            TWILIO_ACCOUNT_SID="$OPTARG"
            export TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID
            ;;
        b)
            echo "api key is present"
            TWILIO_AUTH_TOKEN="$OPTARG"
            export TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN
            ;;
        c)
            echo "sendgrid api key present"
            SENDGRID_API_KEY="$OPTARG"
            ;;
        ?)
            echo "You did not provide anything"
            exit 1
            ;;
    esac
done


echo "Now creating needed services"

# Create dotenv file for project environment variables
touch functions/.env 
echo "TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID" >> functions/.env
echo "TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN" >> functions/.env 
echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> functions/.env

# Create Verify Demo Service
verifyServiceSid=$(curl -X POST "https://verify.twilio.com/v2/Services" \
--data-urlencode "FriendlyName=KG Verify Demo Service" \
--data-urlencode "UIEditable=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN | jq --raw-output '.sid')

# # Delete Verify Service 
# curl -X DELETE "https://serverless.twilio.com/v1/Services/ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
# -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

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
--data-urlencode "FriendlyName=KG Demo Messaging Service" \
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

# Create a new Sendgrid Api Key, NEED TO COMPLETE AND REQUIRES ANOTHER API KEY TO CREATE VIA API
echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> functions/.env


# # Prepare for deployment to Twilio serverless
cp ./package.json ./functions/

cd functions && twilio serverless:deploy --env .env


# twilio serverless:deploy 

