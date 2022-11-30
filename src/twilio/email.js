import Sendgrid from '../utils/sendgridClient';
const client = new Sendgrid().getSendgridClient();

import { verifyEmailHtmlTemplate } from '../utils/utils';

export const createDynamicTemplate = async (name) => {
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
    .then(([response, body]) => [response,body])
    .catch(err => err);
}

export const createTemplateVersion = async (templateId, name, subject, active, htmlContent) => {
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

export const createVerifyTemplateVersion = async (
  templateId, 
  name = "Verify OTP Template", 
  subject = "KG's One Time Passcode", 
  active = 1
) => {
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
    .then( ([response, data]) => [response, data])
    .catch(err => err);
}

export const updateTemplateVersion= async (
  templateId,
  versionId,
  active,
  name,
  subject,
  htmlContent
) => {
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