'use strict';

const crypto = require('crypto');

module.exports.register = (user, cb) => {
  return cb({
    id: Math.floor(Math.random() * 100 + 1),
    session: crypto.createHash('md5').update(user.email).digest('hex'),
    email: user.email,
    name: user.name
  });
}
