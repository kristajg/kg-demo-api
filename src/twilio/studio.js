// twilio client
import { client } from '../utils/twilioClient';

export const executeStudioFlow = async (studioFlowId = process.env.STUDIO_FLOW_DEMO_ID, to, from, parameters = {}) => {
  return await client.studio.v2.flows(studioFlowId)
    .executions
    .create({
      to, // System number to forward calls or messages to
      from, // Twilio number the call will come from.
      parameters, // Optional JSON to insert variables into studio flow
    })
    .then(data => {
      console.log('Success executing studio flow: ', data);
      return data;
    })
    .catch(err => {
      console.log('Error executing studio flow ', err);
      return err;
    });
}
