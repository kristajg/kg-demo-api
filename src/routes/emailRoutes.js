const express = require('express');
const router = express.Router();

import { createDynamicTemplate, createTemplateVersion, createVerifyTemplateVersion, updateTemplateVersion } from '../twilio/email';

router.post('/email/create-email-template', (req, res) => {
    const { name } = req.body;
    
    createDynamicTemplate(name)
    .then( ([response, data]) => res.status(200).json({data}))
    .catch(err => {
        console.log('error creating template', err);
        res.status(400).send('Error creating template');
    })
});

router.post('/email/create-template-version', (req, res) => {
    const { templateId, name, subject, active, htmlContent } = req.body;

    createTemplateVersion(templateId, name, subject, active, htmlContent)
    .then(([response, data]) => res.status(200).json({data}))
    .catch(err => {
        console.log('error creating template version ', err);
        res.status(400).send(`Error creating template version ${err}`);
    })
});

router.post('/email/create-verify-template-version', (req, res) => {
    const { templateId, name, subject } = req.body;

    createVerifyTemplateVersion(templateId, name, subject)
    .then( ([response, data]) => res.status(200).json({data}))
    .catch(err => res.status(400).send(`Error creating verify template version ${err}`));
})

router.post('/email/update-template-version', (req, res) => {
    const { templateId, versionId, active, name, subject } = req.body;
    
    updateTemplateVersion(templateId, versionId, active, name, subject, htmlContent)
    .then( ([response, data]) => {
        console.log('updated verify template');
        res.status(200).json({data});
    })
    .catch(err => res.status(400).send(`Error modifying template for verify ${err}`))
});

module.exports = router;