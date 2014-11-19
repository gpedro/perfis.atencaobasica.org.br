var request = require('supertest');
var assert = require('assert');
var async = require('async');
var stubs = require('../../stubs.js');

describe('Oauth', function() {
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

    describe('Oauth2 authorize', function() {
      it('GET /api/v1/oauth2/authorize?service=cdp should return'+
        '302 and redirect to /login and redirect to service '+
        'callback after login', function (done) {
        var agent = request.agent(sails.hooks.http.app);
        var serviceName = 'cdp';
        var serviceCallback = sails.config.oauth.services[serviceName].callbackUrl;

        agent.get('/api/v1/oauth2/authorize?service=' + serviceName)
        .set('Accept', 'application/json')
        .expect(302)
        .end(function(err, res) {
          if(err) throw err;
          assert.ok(res.headers.location);
          assert.equal('/login', res.headers.location);

          agent.post('/auth/login')
          .send({
            email: user.email,
            password: user.password
          })
          .end(function(err, res) {
            if (err) throw err;
            assert.ok(res.body.id);
            assert.equal(res.body.id, user.id);

            agent.get('/')
            .expect(302)
            .end(function(err, res) {
              if(err) throw err;
              assert.ok(res.headers.location);
              var hasTheRedirect = (res.headers.location.indexOf(serviceCallback) > -1);
              assert.ok(hasTheRedirect, 'Redirect callback is wrong or not set');

              done();
            });

          });
        });
      })
    })
  });

  describe('Authenticated', function() {
    var agent;
    // after authenticated requests login the user
    before(function(done) {
      agent = request.agent(sails.hooks.http.app);

      agent.post('/auth/login')
      .send({
        email: user.email,
        password: user.password
      })
      .end(function(err) {
        if (err) throw err;
        done()
      });
    })

    describe('Oauth2 authorize', function() {
      it('GET /api/v1/oauth2/authorize?service=cdp should return 302 and redirect to provider callback', function (done) {
        var serviceName = 'cdp';
        var serviceCallback = sails.config.oauth.services[serviceName].callbackUrl;
        agent.get('/api/v1/oauth2/authorize?service=' + serviceName)
        .set('Accept', 'application/json')
        .expect(302)
        .end(function(err, res) {
          if(err) throw err;
          assert.ok(res.headers.location);
          var hasTheRedirect = (res.headers.location.indexOf(serviceCallback) > -1);
          assert.ok(hasTheRedirect, 'Redirect callback is wrong or not set');
          done();
        })
      })
    })

  })
})