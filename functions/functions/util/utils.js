const { writeFile } = require('fs');

const getFutureTimeInMins = diffInMinutes => {
  let date = new Date();
  let newDateObj = new Date(date.getTime() + diffInMinutes*60000);
  return newDateObj.toISOString();
}

const insertSpaceBetweenChars = text => {
  return text.split('').join(' ');
};

// Remove whitespace and swap common words for desired characters
const scrubDialogFlowText = text => {
  // convert to characters for formatting
  text = text.replaceAll('hyphen', '-');
  text = text.replaceAll('dash', '-');
  text = text.replaceAll('space', '');

  // remove whitespace
  text = text.replace(/\s+/g, '');

  // insert spaces between character to make the numbers "readable" for the IVR
  text = text.split('').join(' ');

  // swap special characters back for "readable" words for the IVR
  text = text.replaceAll('-', 'dash');

  return text;
}

const writeTextToFile = text => {
  writeFile('./SAMPLE_TEXT.txt', `${text}\n`, { flag: 'a+' }, err => {
    if (err) console.log('Error writing to file ', err);
    console.log('file write success');
  });
}

const verifyEmailHtmlTemplate = `
  <html>
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
      {{twilio_message_without_code}}
    </p>
    <p>
      {{twilio_code}}
    </p>
  </center>
  </body>
  </html>`;

module.exports = {
  getFutureTimeInMins,
  insertSpaceBetweenChars,
  scrubDialogFlowText,
  writeTextToFile,
  verifyEmailHtmlTemplate,
}