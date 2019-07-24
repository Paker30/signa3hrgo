'use strict';

const { PORT } = require('./config/env');

const Glue = require('@hapi/glue');

const manifest = {
  server: {
    address: '0.0.0.0'
    , port: PORT
  },
  register: {
    plugins: [
      'vision'
      , 'inert'
      , 'lout'
      , './api/sign'
      , {
        plugin: 'hapi-swagger'
        , options: {
          info: {
            title: 'a3hrgo-api Documentation'
            , description: 'API gateway to sign into a3hrgo'
          }
          , pathPrefixSize: 2
        }
      }
    ]
  }
};

const options = {
  relativeTo: __dirname
};

const startServer = async function () {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log('hapi days!');
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
