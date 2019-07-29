'use strict';

module.exports = {
  PORT: process.env.PORT || 8000
  , SIGN_URI: process.env.SIGN_URI || 'https://ecolex.a3hrgo.com'
  , PUPPETEER_CONFIG: {
    PROD: {
      executablePath: '/usr/bin/google-chrome-unstable'
      , args: [
        '--disable-dev-shm-usage'
        , '--no-sandbox'
      ]
    }
    , DEVELOP: {}
  }
};
