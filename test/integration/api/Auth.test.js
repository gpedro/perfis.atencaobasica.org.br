var request = require('supertest');
var crypto = require('crypto');
var assert = require('assert');
var async = require('async');

//var sinon   = require('sinon');
//var uuid = require('node-uuid');

var userStub = function() {
  var randString = crypto.randomBytes(20).toString('hex');
  return {
    username: randString.slice(0,15),
    biography:  randString + ' is a auto generated user!',
    email:  randString + '@albertosouza.net',
    password: '123',
    displayName: 'Afro Samuray',
    language: 'pt-br'
  }
}

var categoryStub = function(userId, vocabularyId) {
  return [{
    text: 'Saúde',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Educação',
    creator: userId,
    vocabulary: vocabularyId
  }]
}

var tagStub = function(userId) {
  return [{
    text: 'test',
    creator: userId
  },
  {
    text: 'Educação',
    creator: userId
  }]
}

describe('Auth', function() {
  // var user;
  // var vocabulary;
  // // after all create one user stub
  // before(function(done) {

  //   async.series([
  //     function createUser(done) {
  //       var uStub = userStub();
  //       var password = uStub.password;
  //       User.create(uStub)
  //       .exec( function(err, u){
  //         if( err ) {
  //           console.log(err);
  //           return done(err);
  //         }

  //         user = u;
  //         user.password = password;
  //         done();
  //       })
  //     },
  //     function createVocabulary(done) {
  //       Vocabulary.create({
  //         creator: user.id,
  //         name: 'Temas da comunidade',
  //         description: 'Vocabulário com os temas da Comunidade de Práticas'
  //       })
  //       .exec(function(err, v){
  //         if (err) return done(err);
  //         if (!v) return done('vocabularies dont created', err, v);
  //         sails.log.verbose('vocabulary created:', v);
  //         vocabulary = v;
  //         done();
  //       });
  //     },

  //     function createCategories(done) {
  //       Term.create(categoryStub(user.id, vocabulary.id))
  //       .exec(function(err, terms){
  //         if (err) return done(err);
  //         if (!terms) return done('terms dont created', err, terms);

  //         sails.log.verbose('terms created:', terms);
  //         done();
  //       });
  //     },
  //     function createTags(done) {
  //       Term.create(tagStub(user.id))
  //       .exec(function(err, terms){
  //         if (err) return done(err);
  //         if (!terms) return done('tags dont created', err, terms);
  //         sails.log.verbose('tags created:', terms);
  //         done();
  //       });
  //     }

  //   ], function(err){
  //     if (err) {
  //       console.error('Error on create stub data', err);
  //       return done(err);
  //     }

  //     done();
  //   });
  // })

  // // JSON REQUESTS //
  // //
  describe('NotAuthenticated', function() {
    describe('FORM Requests', function() {
      describe('POST', function() {
        it('/signup shold create a user login the user and redirect to homepage', function (done) {
          var agent = request.agent(sails.hooks.http.app);

          var user = userStub();
          user.confirmPassword = user.password;

          agent.post('/signup')
          //.set('X-CSRF-Token', testCsrfToken)
          .send( user )
          //.expect(201)
          .end(function (err, res) {
            if(err) return done(err);
            // validar a resposta do request aqui ...
            sails.log.warn('<>>', res.body);

            done();
          });
        })
      })
    })
  })


  // describe('Authenticated', function() {
  //   var agent ;
  //   // after authenticated requests login the user
  //   before(function(done) {

  //     agent = request.agent(sails.hooks.http.app);

  //     agent.post('/auth/login')
  //     .send({
  //       email: user.email,
  //       password: user.password
  //     })
  //     .end(function(err) {
  //       done(err);
  //     });
  //   })

  //   describe('JSON Requests', function() {
  //     describe('POST', function() {
  //       it('/api/v1/relato should create one relato and return 201 with the relato created', function (done) {

  //         var relato = relatoStub();

  //         agent.post('/api/v1/relato')
  //         .set('Accept', 'application/json')
  //         //.set('X-CSRF-Token', testCsrfToken)
  //         .send( relato )
  //         .expect('Content-Type', /json/)
  //         .expect(201)
  //         .end(function (err, res) {
  //           if(err) return done(err);

  //           assert.ok(res.body);
  //           assert.ok(res.body.relato);
  //           assert.ok(res.body.relato.id);

  //           assert.equal(relato.titulo, res.body.relato.titulo);
  //           assert.equal(relato.descricao, res.body.relato.descricao);

  //           assert.equal(res.body.relato.categorias.length, 2);
  //           assert.equal(res.body.relato.tags.length, 3, 'Relato tags need be 3 , get: ' + res.body.relato.tags.length);

  //           done();
  //         });


  //       });

  //       it('/api/v1/relato should create a seccond relato and return 201 with the relato created and has correct terms in db', function (done) {

  //         var relato = relatoStub();

  //         return agent.post('/api/v1/relato')
  //         .set('Accept', 'application/json')
  //         //.set('X-CSRF-Token', testCsrfToken)
  //         .send( relato )
  //         .expect('Content-Type', /json/)
  //         .expect(201)
  //         .end(function (err, res) {
  //           if(err) return done(err);

  //           assert.ok(res.body);
  //           assert.ok(res.body.relato);
  //           assert.ok(res.body.relato.id);

  //           assert.equal(relato.titulo, res.body.relato.titulo);
  //           assert.equal(relato.descricao, res.body.relato.descricao);

  //           assert.equal(res.body.relato.categorias.length, 2);
  //           assert.equal(res.body.relato.tags.length, 3, 'Relato tags need be 3 , get: ' + res.body.relato.tags.length);

  //           return Term.find({
  //             vocabulary: null
  //           })
  //           .exec(function(err, terms){
  //             assert.equal(terms.length, 3, 'Terms length after create relatos need be 3 and is: ' + terms.length);
  //             return  done();
  //           })
  //         });

  //       });
  //     });
  //   });
  // });
});
