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

## Configuration

Rename ```config/local.example``` to ```config/local.js``` , open it and configure database, email and site vars


## CLI scripts

> Terminal scripts.

### Create stub Data

```sh
node bin/create-stub-data.js
```


### Create example / stub data

```sh
node bin/create-stub-data.js
```
