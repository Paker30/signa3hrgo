'use strict';

const { sign } = require('./sign');

module.exports = {
  name: 'sign'
  , version: '1.1.1'
};

module.exports.register = async (server) => {

  server.route({
    method: 'POST'
    , path: '/sign'
    , config: {
      description: 'Sign into a3hrgo'
      , tags: ['api', 'a3hrgo']
    }
    , async handler(request, h) {
      return sign(request.payload)
        .catch((err) => {
          console.error(err);
          return err;
        });
    }
  });
};
