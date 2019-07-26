'use strict';

const Puppeteer = require('puppeteer');
const { SIGN_URI } = require('../../config/env.js');

const sign = async ({ user, password }) => {
  const browser = Puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-unstable'
    , args: [
      '--disable-dev-shm-usage'
      , '--no-sandbox'
    ]
  }).catch((err) => {

    console.log('FATAL - Unable to launch puppeteer');
    console.dir(err, { depth: 4 });
    process.exit(111);
  });

  const page = await browser.newPage();

  await page.goto(SIGN_URI);
  await page.type('input#Login', user);
  await page.type('input#Password', password);
  return Promise.all([
    page.click('input.btnLogin')
    , page.waitForResponse((response) => response.url() === 'https://ecolex.a3hrgo.com/Account/Login?ReturnUrl=%2F')
  ])
    .then(([_, login]) => {
      return login.status() !== 302
        ? Promise.reject({ message: 'Wrong credentials' })
        : Promise.all([
          page.goto('https://ecolex.a3hrgo.com/Fichajes/CrearFichajes/0')
          , page.waitForNavigation({ waitUntil: 'load' })
        ]);
    })
    .then(() => page.click('button#btnGuardar'))
    .then(() => {
      browser.close();
      return { status: 'ok', result: 'sing' };
    })
    .catch((err) => {
      browser.close();
      console.error(err);
      return { status: 'ko', result: err.message };
    });
};

module.exports = {
  sign
};
