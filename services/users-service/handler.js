'use strict';

const crypto = require('crypto');
const fdk = require('@serverless/fdk');

const eventGateway = fdk.eventGateway({
  url: 'http://localhost:4000'
});

// Ideally, here you would save user to the database, but we are mocking it for now
const saveUser = userData => {
  return {
    id: Math.floor(Math.random() * 100 + 1),
    session: crypto.createHash('md5').update(userData.email).digest('hex')
  };
};

// Input via post: {"user": {"name": "Rupak Ganguly", "email": "rupak@serverless.com"}}
module.exports.registerUser = (event, context, callback) => {
  // console.log(
  //   '\n********** Event: \n' + JSON.stringify(event) + '**********\n'
  // );

  var userData = {};

  // if (event.dataType === 'application/json') {
  //   try {
  //     userData = event.data.body;
  //   } catch (e) {
  //     console.log(
  //       '\n********** ERROR: In parsing data payload **********\n' +
  //         e +
  //         '\n**********\n'
  //     );
  //   }
  // }

  // save user to the database
  // var savedUserData = saveUser(userData);
  var savedUserData = saveUser({
    email: 'team@serverless.com' // TODO use userData for this
  });

  // console.log('\n********* User data saved to the database. **********\n');

  // Emit event 'user.created'
  eventGateway
    .emit({
      event: 'user.created',
      data: savedUserData
    })
    .then(() => {
      // console.log(
      //   "\n********** Event 'user.created' emitted with data:" +
      //     JSON.stringify(savedUserData) +
      //     '\n**********\n'
      // );
      // const response = {
      //   statusCode: 201,
      //   headers: {
      //     Location: `/users/${savedUserData.id}`
      //   },
      //   body: JSON.stringify({
      //     data: savedUserData,
      //     message: 'User registered successfully.'
      //   })
      // };

      callback(null, savedUserData);
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
    '\n********** Get user' + JSON.stringify(response) + '\n**********\n'
  );

  callback(null, response);
};
