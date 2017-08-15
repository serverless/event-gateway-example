'use strict';

const fdk = require('@serverless/fdk');
const users = require('./lib/users.js')

const eventGateway = fdk.eventGateway({
  url: 'http://localhost:4000'
});

module.exports.register = (event, context, callback) => {

  // Validate
  if (!event.data || !event.data.body || !event.data.body.email) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: 'Email is required'})
    })
  }

  // Register user
  users.register({
    email: event.data.body.email,
    name: event.data.body.name
  }, function(data) {

    // Emit event
    eventGateway
      .emit({
        event: 'user.registered',
        data: data
      })
      .then(() => {
        return callback(null, data);
      })
      .catch(err => {
        return callback({ error: err }, null);
      });
  });
};
