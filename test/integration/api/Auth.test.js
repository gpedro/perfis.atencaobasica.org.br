var request = require('supertest');
var assert = require('assert');
var async = require('async');
var stubs = require('../../stubs.js');

describe('Auth', function() {
  var user;
  // before all create one user stub
  before(function(done) {
    async.series([
      function createUser(done) {
        var uStub = stubs.userStub();
        var password = uStub.password;
        User.create(uStub)
        .exec( function(err, u){
          if( err ) {
            console.log(err);
            return done(err);
          }

          user = u;
          user.password = password;
          done();
        })
      }
    ], function(err){
      if (err) {
        console.error('Error on create stub data', err);
        return done(err);
      }
      done();
    });
  })

  describe('Unauthenticated', function() {
    describe('JSON Requests', function() {
      describe('Login', function() {
        it('POST /auth/login should login user and returns logged in user object', function (done) {
          var agent = request.agent(sails.hooks.http.app);

          agent.post('/auth/login')
          .send({
            email: user.email,
            password: user.password
          })
          .expect(200)
          .end(function(err, res) {
            if(err) return done(err);

            assert.ok(res.body);
            assert.ok(res.body.id);
            assert.equal(res.body.username, user.username);
            assert.equal(res.body.displayName, user.displayName);
            assert.equal(res.body.id, user.id);

            // do a seccond request to ensures how user is logged in
            agent.get('/account')
            .expect(200)
            .end(function(err, res) {
              if(err) return done(err);

              assert.ok(res.body);
              assert.ok(res.body.user);
              assert.equal(res.body.user.username, user.username);
              assert.equal(res.body.user.displayName, user.displayName);
              assert.equal(res.body.user.id, user.id);

              done();
            });
          });
        });
      })

      describe('Login wrong', function() {
        it('POST /auth/login should return 401 and Invalid password with wrong password', function (done) {
          var agent = request.agent(sails.hooks.http.app);
          agent.post('/auth/login')
          .send({
            email: user.email,
            password: 'awordngpasswrd:('
          })
          .expect(401)
          .end(function(err, res) {
            if(err) throw err;
            assert.ok(res.body);
            assert.ok(res.body.error);
            assert.equal(res.body.error.length, 1);
            assert.equal(res.body.error[0].message, 'Invalid password');
            done();
          });
        });

        it('POST /auth/login should return 401 and Unknow email with unknow email', function (done) {
          var agent = request.agent(sails.hooks.http.app);
          var invalidPassword =  'ainvalidemail@invald.c';
          agent.post('/auth/login')
          .send({
            email: invalidPassword,
            password: 'awordngpasswrd:('
          })
          .expect(401)
          .end(function(err, res) {
            if(err) throw err;
            assert.ok(res.body);
            assert.ok(res.body.error);
            assert.equal(res.body.error.length, 1);
            assert.equal(res.body.error[0].message, 'Unknown email ' + invalidPassword);
            done();
          });
        });
      })

      describe('Register', function() {
        it('POST /signup should login user and returns logged in user object', function (done) {
          var agent = request.agent(sails.hooks.http.app);

          var userData = stubs.userStub();
          userData.confirmPassword = userData.password;

          agent.post('/signup')
          .send(userData)
          .expect(201)
          .end(function(err, res) {
            if(err) return done(err);
            assert.ok(res.body);
            assert.ok(res.body.id);
            assert.equal(res.body.username, userData.username);
            assert.equal(res.body.cpf, userData.cpf.replace(/\./g, '').replace(/-/g, ''));
            done();
          });
        });
      });
    })

    describe('Request password', function() {
      it('/auth/forgot-password should send reset password email with valid email', function (done) {

        request(sails.hooks.http.app)
        .post('/auth/forgot-password')
        .send({
          email: user.email
        })
        .expect(200)
        .end(function(err, res){
          if (err) throw err;

          assert.ok(res.body);
          assert.ok(res.body.success);
          assert.equal(res.body.success[0].type, 'email_send');

          done();
        });

      });
    });

  })
});
