'use strict'

const fetch = require('node-fetch');
const md5 = require('md5');
const API_KEY = process.env.API_KEY;

module.exports.getEntities = (email, cb) => {
    const imageUri = "http://www.gravatar.com/avatar/" + md5(email);

    return annotateImage(imageUri)
    .then(function(json) {
      const webEntities = json.responses[0].webDetection.webEntities;
      const entities = webEntities.map(function(d) {return d.description});
      return cb({
        email: email,
        entities: entities
      })
    });
}

const annotateImage = (imageUri) => {
  var body = {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri": imageUri
          }
        },
        "features": [
          {
            "type": "WEB_DETECTION",
            "maxResults": 5
          }
        ]
      }
    ]
  };

  return fetch('https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY, { method: 'POST', body: JSON.stringify(body) })
    .then((res) => res.json())
}
