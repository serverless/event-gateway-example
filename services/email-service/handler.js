'use strict';

const emailer = require('./lib/emailer');

const EVENT_GATEWAY_URL = 'http://localhost:4000'; // process.env.EVENT_GATEWAY_URL;
const EVENT_GATEWAY_CONFIG_URL = 'http://localhost:4001'; // process.env.EVENT_GATEWAY_CONFIG_URL;
const fdk = require('@serverless/fdk');
const eventGateway = fdk.eventGateway({
  url: EVENT_GATEWAY_URL,
  configurationUrl: EVENT_GATEWAY_CONFIG_URL
});

module.exports.sendWelcomeEmail = (event, context, callback) => {

  // TODO: Send email here...

  // Emit event 'email.sent'
  eventGateway
    .emit({
      event: 'email.sent',
      data: {}
    })
    .then(() => {
      // console.log("\n********** Event 'email.sent' emitted with data:");
    })
    .catch(err => {
      // console.log(
      //   "\n********** ERROR: In emitting 'email.sent' event **********\n" +
      //     err +
      //     '\n**********\n'
      // );
    });

  return callback(null, { message: 'Email sent.' });

};
