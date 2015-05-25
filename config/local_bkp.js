/**
 * Local environment settings
 *
 * While you're DEVELOPING your app, this config file should include
 * any settings specifically for your development computer (db passwords, etc.)
 *
 * When you're ready to deploy your app in PRODUCTION, you can always use this file
 * for configuration options specific to the server where the app will be deployed.
 * But environment variables are usually the best way to handle production settings.
 *
 * PLEASE NOTE:
 *    This file is included in your .gitignore, so if you're using git
 *    as a version control solution for your Sails app, keep in mind that
 *    this file won't be committed to your repository!
 *
 *    Good news is, that means you can specify configuration for your local
 *    machine in this file without inadvertently committing personal information
 *    (like database passwords) to the repo.  Plus, this prevents other members
 *    of your team from commiting their local configuration changes on top of yours.
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#documentation
 */

module.exports = {
  // You project app name
  appName: 'Comunidade de Práticas',
  acl: {
    disabled: false
  },
  auth: {
   cookieDomain: '.cdp.dev',
   isProvider: true,
   enableLogin: true
 },

  // we Oauth2 configs
  wejs: {
    providers: {
      wembed: 'http://wembed.wejs.dev',
      accounts: 'http://perfis.cdp.dev',
      api: 'http://perfis.cdp.dev',
      cookieDomain: '.cdp.dev'
    }
  },

  // change to true to force browser refresh javascript cache automaticaly
  // use it only for development
  forceBrowserCacheRefresh: true,

  fileUploadPath: 'files/uploads/files',
  imageUploadPath: 'files/uploads/images',

  // port
  port: process.env.PORT || 1430,

  /**
   * Client side configs
   * @type {Object}
   */
  clientside: {
    // change to true to force browser refresh javascript cache automaticaly
    // use it only for development
    forceBrowserCacheRefresh: true,

    // live road suport
    // TODO fix it ...
    enableLiveReload: false,

    // we.js logs
    // client side logs
    log: {
      events: true,
      hooks: true
    }
  },

  environment: process.env.NODE_ENV || 'development',
  //environment: process.env.NODE_ENV || 'production',

  // hostname is used for set images url
  hostname: 'http://localhost:1430',
  //host: 'http://localhost',

  site: {
    // if true send a activation email for new
    // accounts and only alow users login after account activation
    requireAccountActivation: false
  },
  //environment: 'production',

  email: {
    // your project default from name
    fromName: 'Comunidade de Práticas',
    siteEmail: 'contato@atencaobasica.org.br', // your project email
    defaultService: 'test',
    services: {
      Mandrill: {
        service: 'Mandrill',
        type: 'SMTP',
        host: 'smtp.mandrillapp.com',
        port: 587,
        debug: true,
        auth: {
          user: 'email',
          pass: 'mandrill-key'
        }
      },
      gmail: {
        service: 'gmail',
        type: 'SMTP',
        auth: {
          user: 'email',
          pass: 'password'
        }
      }
    }
  },

  connections: {
    mysql1: {
      module   : 'sails-mysql',
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : 'mv123',
      database : 'cdp'
    },
    drupal: {
      module   : 'sails-mysql',
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : 'mv123',
      database : 'cdp-drupal'
    }
  },

  models: {
    migrate: 'safe', // alter | drop | safe
    connection: 'mysql1'
  },

  session: {
    adapter: 'redis',
    cookie: {
      maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
    }
  }
};