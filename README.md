# tests a we.js blog

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

## After install:

TODO

##How to build

```sh
// install packages
npm install && bower install
// generate prod build
grunt build
// start server as prod env
node . --prod
```

##How to test:

Run all tests:

```sh
mocha test/bootstrap.js test/**/*.test.js
```

Run selected tests:

```sh
mocha test/bootstrap.js test/**/*.test.js -g 'Attribute'
```


## Example config

> See file config/local.example , copy it to config/local.js open and change the configs

## CLI scripts

> All scritps need be run inside project folder ( where app.js are )

### Drop DB and recreate

```sh
node bin/resetDB.js
```

### Register location data used in locationAPI

```sh
node bin/registerLocations.js
```

### Create example / stub data

```sh
node bin/create-stub-data.js
```

### How to set up development login (Without oAuth Server)

1 - Copy config/local.example to config/local.js and alter the following settings:

```sh

var DOMAIN = 'http://localhost';
var PORT = 1430; (Set the port of your choice)
var HOST = DOMAIN + ':' + PORT;

module.exports = {
...

  wejs: {
    providers: {
      wembed: 'http://wembed.wejs.dev',
      accounts: HOST,
      api: HOST,
      cookieDomain: null
    }
  },

  auth: {
    cookieDomain: null,
  },

...

  port: process.env.PORT || PORT,

...

  clientside: {
	...
    publicVars: {
      devLogin: true
    }
  },

...

  hostname: HOST,

...

};

```

2 - Create an user with the following script:

```sh
node bin/create-stub-data.js
```
The script will ask you if you want to create an user, type 'y' to confirm and hit enter. Next, you can choose to type basic user data ('y') or let the script create an stub user for you ('n').

3 - Take the email and password provided on the step above and login in the drop down menu on the navbar

## Como testar o envio dos templates de email

- Atualizar os projetos do perfis.atencaobasica.org.br e we-theme-accounts.perfis
- Instalar o postfix no chrome
- Configurar o defaultService no local.js para usar o Mandrill e configurar o email e chave de acesso do mandrill
- Alterar o hostname no local.js para https://perfis.atencaobasica.org.br
- usar o postfix para acessar algumas das rotas abaixo trocar [seu email] pelo email que vai receber a mensagem e [seu host] pelo seu host:

>  [seu host]/test/testSendAccountValidationEmail?email=[seu email]
>  [seu host]/test/testAuthChangePasswordEmail?email=[seu email]
>  [seu host]/test/testAuthResetPasswordEmail?email=[seu email]
>  [seu host]/test/testMembershipInviteEmail?email=[seu email]
>  [seu host]/test/testRelatoInviteEmail?email=[seu email]
>  [seu host]/test/testRelatoInviteNewUserEmail?email=[seu email]
>  [seu host]/test/testuserNotifications?email=[seu email]

## Credits

team and contributors

## License

MIT
