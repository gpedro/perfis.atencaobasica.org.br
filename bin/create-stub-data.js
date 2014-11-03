/**
 * A helper script to create content for we-cdp
 */

var async = require('async');
var sget = require('sget');

var loadSails = require('./loadSails.js');
var createUserFN = require('../node_modules/we-plugin-user/bin/createUserFN.js');

var stubTemas = function(userId, vocabularyId){
  return [
  {
    text: 'Saúde',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Educação',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Esporte',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Tempo',
    creator: userId,
    vocabulary: vocabularyId
  }
  ];
}

function init() {
  return loadSails(function afterLoadSails(err, sails) {
    var user;
    var vocabulary;

    return async.series([
      function createVocabulary(done){
        createUserFN(function(err, u){
          if (err) return done(err);
          if (!u) return done('User dont created', err, u);

          sails.log.verbose('user created:', u);

          user = u;

          done();
        })
      },

      function createVocabulary(done){
        Vocabulary.create({
          creator: user.id,
          name: 'Temas da comunidade',
          description: 'Vocabulário com os temas da Comunidade de Práticas'
        })
        .exec(function(err, v){
          if (err) return done(err);
          if (!v) return done('vocabularies dont created', err, v);

          sails.log.verbose('vocabulary created:', v);

          vocabulary = v;
          done();
        });
      },

      function createTemas(done){
        Term.create(stubTemas(user.id, vocabulary.id))
        .exec(function(err, terms){
          if (err) return done(err);
          if (!terms) return done('terms dont created', err, terms);

          sails.log.verbose('terms created:', terms);
          done();
        });
      }
      ], doneAll)
  })
}


function doneAll(err){
  if ( err ) {
    sails.log.error('Error on create stub data', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}

init();