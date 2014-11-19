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

before(function(callback) {
  this.timeout(10000);

  var configs = WP.getDefaultSailsConfigForCLI();

  delete configs.hooks.grunt;

  configs = _.merge(configs, {
    requireAccountActivation: false,
    log: {
      level: 'warn'
    },
    models: {
      migrate: 'drop',
      connection: 'test'
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
    session: {
      adapter: 'memory',
      cookie: {
        maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
      }
    },
    wejs: {
      providers: {
        wembed: 'http://wembed.wejs.org',
        accounts: HOST,
        api: HOST,
        cookieDomain: HOST
      }
    }
  });

  Sails.load(configs, function(err, sails) {
    if (err) {
      console.error(err);
      return callback(err);
    }
    // here you can load fixtures, etc.
    callback(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});