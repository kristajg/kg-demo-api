import { writeFile } from 'fs';

export const getFutureTimeInMins = diffInMinutes => {
  let date = new Date();
  let newDateObj = new Date(date.getTime() + diffInMinutes*60000);
  return newDateObj.toISOString();
}

export const insertSpaceBetweenChars = text => {
  return text.split('').join(' ');
};

// Remove whitespace and swap common words for desired characters
export const scrubDialogFlowText = text => {
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

export const writeTextToFile = text => {
  writeFile('./SAMPLE_TEXT.txt', `${text}\n`, { flag: 'a+' }, err => {
    if (err) console.log('Error writing to file ', err);
    console.log('file write success');
  });
}

export const verifyEmailHtmlTemplate = `
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
    Click on your one time passcode
  </p>
  <p>
    <a href="https://test-twilio-sandbox-6298-dev.twil.io/verify/submit-verification-code?token={{twilio_code}}" 
       style="background-color:#ffbe00; color:#000000; display:inline-block; padding:12px 40px 12px 40px; text-align:center; text-decoration:none;" 
       target="_blank">{{twilio_code}}</a>
  </p>
</center>
</body>
</html>`;
