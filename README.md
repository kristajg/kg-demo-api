# kg-demo-api
Sandbox API for demos and learning


# Deploying the Demo API

## Prerequisites

* Node > 14
* A [Twilio](https://www.twilio.com/try-twilio) Account
* A [Sendgrid](https://signup.sendgrid.com/) Account

## Init Scripts

*These scripts are only applicable to Mac users at this time*

Looking at the root project directory you'll find two init files.  
```
/init-local.sh
/init-serverless.sh 
```

These scripts will configure the majority of the Demo environment for you. It creates Twilio and Sendgrid services necessary for this demo to work, saving a lot of time and only a few changes to be made in the Twilio console. The local script will perform everything you need to get the demo running locally, and the serverless script will setup the project to be deployed to your Twilio Functions. [Twilio Functions](https://www.twilio.com/docs/serverless/functions-assets/functions) are a functions in a serverless environment.

To skip using the scripts and create everything in the Twilio console and Sendgrid dashboard, continue with directions below.

### Run Script

From the projects root directory you can run either init script. The command to run the scripts is the same with only the file names being different. 

```bash
chmod +x ./init-local.sh && ./init-local.sh
```

When this command runs you will be prompted to enter your Twilio Account Sid, Twilio Auth Token, and you Sendgrid API Key. If you don't provide them, the scripts will fail to create the services needed for your demo environment.

Alternatively, you can provide the credentials with flags like so
```bash
./init-serverless.sh --account-sid <TWILIO_ACCOUNT_SID> --auth-token <TWILIO_AUTH_TOKEN> --sendgrid-api-key <SENDGRID_API_KEY>
```

### Remaining Twilio Configuration
TODO: Verify set default email configurations



TODO: Directions create services for demo to work in Console
