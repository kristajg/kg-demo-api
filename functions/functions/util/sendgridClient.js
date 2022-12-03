const client = require('@sendgrid/client');

class Sendgrid {
  constructor(){
  }
  
  getSendgridClient(apiKey){
    client.setApiKey(apiKey);
    return client;
  }
}

module.exports = Sendgrid;
