'use strict';

const EVENT_GATEWAY_URL = process.env.EVENT_GATEWAY_URL;
const EVENT_GATEWAY_CONFIG_URL = process.env.EVENT_GATEWAY_CONFIG_URL;

const fdk = require('@serverless/fdk');
const eventGateway = fdk.eventGateway({
  url: EVENT_GATEWAY_URL,
  configurationUrl: EVENT_GATEWAY_CONFIG_URL
});

// Ideally, here you would save user to the database, but we are mocking it for now
var saveUser = userData => {
  // generate random userId
  var userId = Math.floor(Math.random() * 100 + 1);
  userData.user['id'] = userId;

  return userData;
};

// Input via post: {"user": {"name": "Rupak Ganguly", "email": "rupak@serverless.com"}}
module.exports.registerUser = (event, context, callback) => {
  console.log(
    '\n********** Event: \n' + 
      JSON.stringify(event) + 
      '**********\n'
  );

  var userData = '';
  if (event.body) {
    try {
      userData = JSON.parse(event.body);
    } catch (e) {
      console.log(
        '\n********** ERROR: In parsing event.body **********\n' +
          e +
          '\n**********\n'
      );
    }
  }

  // save user to the database
  var savedUserData = saveUser(userData);

  console.log('\n********* User data saved to the database. **********\n');

  // Emit event 'user.created'
  eventGateway
    .emit({
      event: 'user.created',
      data: savedUserData
    })
    .then(() => {
      console.log(
        "\n********** Event 'user.created' emitted with data:" +
          JSON.stringify(savedUserData) +
          '\n**********\n'
      );
      // send reponse back
      var userId = savedUserData.user.id;

      const response = {
        statusCode: 201,
        headers: {
          Location: `/users/${userId}`
        },
        body: JSON.stringify({
          data: savedUserData,
          message: 'User registered successfully.'
        })
      };

      callback(null, response);
    })
    .catch(err => {
      console.log(
        "\n********** ERROR: In emitting 'user.created' event **********\n" +
          err +
          '\n**********\n'
      );
    });
};

module.exports.getUser = (event, context, callback) => {
  var userData = {
    user: { id: 123, name: 'Rupak Ganguly', email: 'rupak@serverless.com' }
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      data: userData,
      message: 'User fetched successfully.'
    })
  };

  console.log(
    '\n********** Get user' + 
      JSON.stringify(response) + 
      '\n**********\n'
  );

  callback(null, response);
};
