const Sendgrid = require(Runtime.getFunctions()["util/sendgridClient"].path);
const sendgrid = new Sendgrid();

const { verifyEmailHtmlTemplate } = require(Runtime.getFunctions()["util/utils"].path);

const createDynamicTemplate = async (apiKey, name) => {
  const client = sendgrid.getSendgridClient(apiKey);
  //optional
  const headers = {};
  const body = {
    "name": name,
    "generation": "dynamic"
  }
  const request = {
    url: '/v3/templates',
    method: 'POST',
    headers,
    body,
  };
  return await client.request(request)
    .then(([response, body]) =>  [response, body])
    .catch(err => err);
}

const createTemplateVersion = async (apiKey, templateId, name, subject, active, htmlContent) => {
  const client = sendgrid.getSendgridClient(apiKey);
  //optional
  const headers = {};
  const body = {
    templateId,
    name,
    subject,
    active,
    htmlContent
  }
  const request = {
    url: `/v3/templates/${templateId}/versions`,
    method: "POST",
    headers,
    body,
  }
  return await client.request(request)
    .then(([response, body]) => [response, body])
    .catch(err => err);
}

const createVerifyTemplateVersion = async (
  apiKey,
  templateId, 
  name = "Verify OTP Template", 
  subject = "One Time Passcode", 
  active = 1
) => {
  const client = sendgrid.getSendgridClient(apiKey);
  //optional
  const headers = {};
  const data = {
    template_id: templateId,
    name,
    subject,
    active,
    html_content: verifyEmailHtmlTemplate 
  }
  const request = {
    url: `/v3/templates/${templateId}/versions`,
    method: "POST",
    headers,
    body: data,
  }

  return await client.request(request)
    .then( ([response, body]) => [response, body])
    .catch(err => err);
}

const updateTemplateVersion= async (
  apiKey,
  templateId,
  versionId,
  active,
  name,
  subject,
  htmlContent
) => {
  const client = sendgrid.getSendgridClient(apiKey);
  //optional 
  const headers = {};
  const data = {
    template_id: templateId,
    active,
    name,
    subject,
    htmlContent
  };
  const request = {
    method: 'PATCH',
    url: `/v3/templates/${templateId}/versions/${versionId}`,
    headers,
    body: data
  };

  return await client.request(request)
    .then(([response, body]) => [response, body])
    .catch(err => err);
} 

module.exports = {
  createDynamicTemplate,
  createTemplateVersion,
  createVerifyTemplateVersion,
  updateTemplateVersion,
}