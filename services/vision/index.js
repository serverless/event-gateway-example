'use strict';

const fdk = require('@serverless/fdk');
const vision = require('./lib/vision');

const eventGateway = fdk.eventGateway({
  url: 'http://localhost:4000'
});

exports.annotateUser = (event, callback) => {

  const email = event.data.email;

  vision.getEntities(email, function(data) {

    // Emit event
    eventGateway
      .emit({
        event: 'user.annotated',
        data: data
      })
      .then(() => {
        return callback(null, data);
      })
      .catch(err => {
        return callback({error: err}, null);
      })
  })
};
