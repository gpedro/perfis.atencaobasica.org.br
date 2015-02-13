/**
 * A helper script to create content for we-cdp
 */

var async = require('async');
var _ = require('lodash');
var Chancejs = require('chance');
var chancejs = new Chancejs();

var loadSails = require('./loadSails.js');
var createUserFN = require('../node_modules/we-plugin-user/bin/createUserFN.js');

function init() {
  return loadSails(function afterLoadSails(err, sails) {
    var user;
    var vocabulary_jobs, vocabulary_interests;
    var categories;

    return async.series([
      function createUser(done) {
        User.find().limit(1).exec(function(err, u) {
          if (err) return done(err);
          if (!u) return done('there is need to be at least one user created');
          user = u[0];
          done();
        })
      },

      function createVocabularyForJobs(done){
        Vocabulary.create({
          creator: user.id,
          name: 'Profissisões',
          description: chancejs.sentence({words: 3}),
        })
        .exec(function(err, v){
          if (err) return done(err);
          if (!v) return done('vocabularies dont created', err, v);

          sails.log.verbose('vocabulary created:', v);

          vocabulary_jobs = v;
          done();
        });
      },

      function createVocabularyForInterests(done){
        Vocabulary.create({
          creator: user.id,
          name: 'Interesses',
          description: chancejs.sentence({words: 3}),
        })
        .exec(function(err, v){
          if (err) return done(err);
          if (!v) return done('vocabularies dont created', err, v);

          sails.log.verbose('vocabulary created:', v);

          vocabulary_interests = v;
          done();
        });
      },      
      function createMajor(done){
        Term.create(stubJobs(user.id, vocabulary_jobs.id))
        .exec(function(err, terms){
          if (err) return done(err);
          categories = terms;
          done();
        });
      },
      function createInterests(done){
        Term.create(stubInterests(user.id, vocabulary_interests.id))
        .exec(function(err, terms){
          if (err) return done(err);
          categories = terms;
          done();
        });
      },      
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


var stubJobs = function(userId, vocabularyId){
  return [
  {
    text: 'Ecologista',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Educador',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Eletricista',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Enciclopedista',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Engenheiro',
    creator: userId,
    vocabulary: vocabularyId
  },
  ];
};

var stubInterests = function(userId, vocabularyId){
  return [
  {
    text: 'Esportes',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Lazer',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Música',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Educação',
    creator: userId,
    vocabulary: vocabularyId
  },
  ];
};

init();