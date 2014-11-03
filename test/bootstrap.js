/**
 * Test starter - with this version of sails.js we can only start one sails server,
 * to solve this problem we use only one before All and after All to start and
 * stop the server
 */
var Sails = require('sails');
var themeEngine = require('we-theme-engine');
var WP = require('we-plugin');
var _ = require('lodash')

global.DOMAIN = 'http://localhost';
global.PORT = 1420;
global.HOST = DOMAIN + ':' + PORT;

before(function(done) {
  this.timeout(7000);

  var configs = WP.getDefaultSailsConfigForCLI();

  delete configs.hooks.grunt;

  configs = _.merge(configs, {
    requireAccountActivation: false,
    log: {
      level: 'warn'
    },
    connections: {
      memory: {
        adapter   : 'sails-memory'
      }
    },
    models: {
      connection: 'memory'
    },
    port: PORT,
    environment: 'test',
    // @TODO needs suport to csrf token
    csrf: false,
    hooks: {
      grunt: false,
      socket: false,
      pubsub: false
    },
    paths: {
      'fallbackEmailTemplateFolder': __dirname + '/node_modules/wejs-theme-default/templates/email'
    },
    i18n: {
      // Where are your locale translations located?
      localesDirectory: '/config/locales'
    },
    wejs: {
      providers: {
        wembed: 'http://wembed.wejs.dev',
        accounts: HOST,
        api: HOST,
        cookieDomain: '.cdp.dev'
      }
    }
  });

  Sails.load(configs, function(err, sails) {
    if (err) {
      console.error(err);
      return done(err);
    }

    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});