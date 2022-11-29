import client from '@sendgrid/client';

class Sendgrid {
  constructor(){

  }
  getSendgridClient(context){
    const apiKey = process.env.SENDGRID_API_KEY || context.SENDGRID_API_KEY;
    client.setApiKey(apiKey);
    return client;
  }
}

export default Sendgrid;