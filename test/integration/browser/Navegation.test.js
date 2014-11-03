// var Browser = require('zombie');
// var assert = require('assert');

// var HOST = global.HOST;

// var navbarSelector = 'nav[role=navigation]';

// // Load the page from localhost
// var browser = new Browser();
// browser.silent = true;

// describe('Browser', function() {
//   describe('Start', function() {
//     // start navegation with index page
//     it('/ should load index page', function (done) {
//       browser.visit(HOST+'/', function (e) {
//         if (e) {
//           console.error(e);
//           return done(e);
//         }

//         browser.assert.attribute('body', 'class', 'ember-application home');

//         done();
//       });
//     });
//   });

//   describe('Navegation', function() {
//     describe('User', function() {
//       it('/user should change to user.index page', function (done) {
//         browser.clickLink(navbarSelector + ' li a[href="/user"]', function(e) {
//           if (e) {
//             console.error(e);
//             return done(e);
//           }

//           browser.assert.attribute('body', 'class', 'ember-application users users-index');

//           done();
//         });
//       });
//     });

//     describe('Group', function() {
//       it('/g should change to group.index page', function (done) {
//         browser.clickLink(navbarSelector + ' li a[href="/g"]', function(e) {
//           if (e) {
//             console.error(e);
//             return done(e);
//           }

//           browser.assert.attribute('body', 'class', 'ember-application groups groups-index');

//           done();
//         });
//       });
//     });

//     describe('Notification', function() {
//       // it('/n should change to group.index page', function (done) {
//       //   browser.clickLink(navbarSelector + ' li a[href="/n"]', function(e) {
//       //     if (e) {
//       //       console.error(e);
//       //       return done(e);
//       //     }

//       //     browser.assert.attribute('body', 'class', 'ember-application notifications notifications-index');

//       //     done();
//       //   });
//       // });
//     });
//   });
// });