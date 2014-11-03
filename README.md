# Projeto Comunidade de Práticas

## Requirements

 - Redis database ( for session )
 - Mysql database ( for data )
 - node.js
 - npm

## How to install

```sh
// install packages
npm install && bower install
// run for development
npm start
```

##How to build

```sh
// install packages
npm install && bower install
// generate prod build
grunt build
// start server as prod env
node . --prod
```

## Example config

```js
// file config/local.js
module.exports = {
  appName: 'Comunidade de Práticas',

  fileUploadPath: 'files/uploads/files',
  imageUploadPath: 'files/uploads/images',

  wejs: {
    providers: {
      wembed: 'http://wembed.wejs.org',
      accounts: 'http://cdp.dev',
      api: 'http://cdp.dev',
      cookieDomain: '.cdp.dev'
    }
  },

  port: process.env.PORT || 1430,

  /**
   * Client side configs
   * @type {Object}
   */
  clientside: {
    // change to true to force browser refresh javascript cache automaticaly
    // use it only for development
    forceBrowserCacheRefresh: true,

    enableLiveReload: true,

    // we.js client side logs
    log: {
      events: false,
      hooks: false
    },
    publicVars: {
      oauthNetworkServiceName: 'cdp'
    }
  },

  environment: process.env.NODE_ENV || 'development',
  // /environment: process.env.NODE_ENV || 'production',
  hostname: 'http://localhost',
  //host: 'http://localhost',

  site: {
    // if true send a activation email for new
    // accounts and only alow users login after account activation
    requireAccountActivation: true
  },
  //environment: 'production',

  email: {
    fromName: 'Comunidade de Práticas',
    siteEmail: 'contato@atencaobasica.org.br',
    defaultService: 'Mandrill',
    services: {
      Mandrill: {
        service: 'Mandrill',
        type: 'SMTP',
        host: 'smtp.mandrillapp.com',
        port: 587,
        auth: {
          user: 'your-mandrill-email',
          pass: 'your-mandrill-pass'
        }
      },
      gmail: {
        service: 'gmail',
        type: 'SMTP',
        auth: {
          user: 'your-email',
          pass: 'your-password'
        }
      }
    }
  },

  connections: {
    mysql: {
      module   : 'sails-mysql',
      host     : 'localhost',
      port     : 3306,
      user     : 'your-db-username',
      password : 'your-db-pasword',
      database : 'your-db-name'
    }
  },

  models: {
    migrate: 'alter',
    connection: 'mysql'
  },

  session: {
    adapter: 'redis'
  }
};
```

## CLI scripts


### Create example / stub data

```sh
node bin/create-stub-data.js
```
