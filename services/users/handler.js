'use strict';

const fdk = require('@serverless/fdk');
const users = require('./lib/users.js')

const eventGateway = fdk.eventGateway({
  url: 'http://localhost:4000'
});

module.exports.register = (event, context, callback) => {

  users.register({
    email: event.data.body.email,
    name: event.data.body.name
  }, function(data) {

    // Emit event
    eventGateway
      .emit({
        event: 'user.created',
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
