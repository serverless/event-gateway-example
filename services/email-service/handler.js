'use strict';

const EVENT_GATEWAY_URL = "http://localhost:4000"; // process.env.EVENT_GATEWAY_URL;
const EVENT_GATEWAY_CONFIG_URL = "http://localhost:4001" // process.env.EVENT_GATEWAY_CONFIG_URL;

const MAILGUN_APIKEY   = process.env.MAILGUN_APIKEY
const MAILGUN_DOMAIN   = process.env.MAILGUN_DOMAIN

const fdk = require('@serverless/fdk');
const eventGateway = fdk.eventGateway({
  url: EVENT_GATEWAY_URL,
  configurationUrl: EVENT_GATEWAY_CONFIG_URL
});

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_APIKEY,
  domain: MAILGUN_DOMAIN
});

const fromAddress    = `<demo@MAILGUN_DOMAIN>`;
const subjectText    = "Serverless Emit Demo";
const messageText    = 'Welcome user email notification.';
const messageHtml    = `
<html>
  <title>Serverless Emit Demo</title>
  <body>
    <div>
      <h1>Serverless Emit Demo</h1>
      <span>Welcome user email notification.</span>
    </div>
  </body>
</html>
`

module.exports.sendWelcomeEmail = (event, context, callback) => {

  console.log("**********\n" + JSON.stringify(event) + "**********\n");

  var toAddress = "";
  
  if (event.dataType === "application/json") {
    try {
      // toAddress = JSON.parse(event.data).user.email || "";
      toAddress = event.data.user.email || "";
    }
    catch (e){
      console.log("**********\nError parsing email data", e);
    }  
  }

  if (toAddress !== "") {

    const emailData = {
        from: fromAddress,
        to: toAddress,
        subject: subjectText,
        text: messageText,
        html: messageHtml
    };

    // send email
    mailgun.messages().send(emailData, (error, body) => {
      if (error) {
        // log error response
        console.log(error);
        const response = {
          statusCode: 400,
          body: JSON.stringify({
            message: error,
            input: body,
          }),
        };
        callback(null, response);
      } else {
        const response = {
          statusCode: 202,
          body: JSON.stringify({
            message: "Request to send email is successful.",
            input: body,
          }),
        };
        callback(null, response);

        // Emit event 'email.sent'
        eventGateway
          .emit({
            event: 'email.sent',
            data: {}
          })
          .then(() => {
            console.log("\n********** Event 'email.sent' emitted with data:");
          })
          .catch(err => {
            console.log(
              "\n********** ERROR: In emitting 'email.sent' event **********\n" +
                err +
                '\n**********\n'
            );
          });

      }
    });
  } else {
    const err = {
      statusCode: 422,
      body: JSON.stringify({
        message: "Bad input data or missing email address.",
        input: event.body,
      }),
    };
    callback(null, err);
  }
};
