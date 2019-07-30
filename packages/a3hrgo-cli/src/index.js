#!/usr/bin/env node

'use strict';

require('dotenv').config();
const { kebabCase, defaults } = require('lodash');
const Preferences = require('preferences');
const { docopt } = require('docopt');
const { version } = require('../package.json');
const Axios = require('axios');

const wrapOptions = (opt) =>
  new Proxy(opt, {
    get(target, key) {
      return target[`<${key}>`] || target[`--${kebabCase(key)}`] || target[key] || target[kebabCase(key)];
    }
  });

const help = `
a3hrgo-cli
 Options can be read from a stored configuration or provided through environment variables.
 Usage:
    a3hrgo-cli sign [--user=<user>] [--password=<password>] [--url=<url>]
    a3hrgo-cli config save <user> <password> <url>
    a3hrgo-cli config print
    a3hrgo-cli -v
 Options:
    -v --version                    Show the version of the tool
`;

const main = async (options) => {

  // Preferences store with default undefined values
  const prefs = new Preferences('com.work.a3hrgo.cli', {
    a3hrgo: {
      user: undefined,
      password: undefined,
      url: 'https://a3hrgoapi.herokuapp.com/sign'
    }
  });

  // Load configurations giving preference to environment variables
  const preferences = defaults(
    {
      user: options.user,
      password: options.password,
      url: options.url
    },
    prefs.a3hrgo
  );

  if (options.version) {
    return console.info('v' + version);
  }

  if (options.sign) {
    return Axios.post(prefs.a3hrgo.url, {
      user: prefs.a3hrgo.user,
      password: prefs.a3hrgo.password
    })
      .then(({ data }) => {
        console.log(data);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (options.config) {
    if (options.save) {
      prefs.a3hrgo = {
        user: options.user,
        password: options.password,
        url: options.url
      };
      return;
    }
    if (options.print) {
      return console.log(prefs);
    }
  }

  console.log('Unsupported commands combination');
};

const options = wrapOptions(docopt(help));
main(options)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
