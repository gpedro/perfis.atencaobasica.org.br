// var Browser = require('zombie');
// var assert = require('assert');

// var HOST = global.HOST;

// // Load the page from localhost
// var browser = new Browser();
// browser.silent = true;

// describe('AuthBrowser', function() {
//   describe('register', function() {
//     it('/auth/register should register one user with valid data', function (done) {
//       browser.visit(HOST+'/auth/register', function (e) {
//         if (e) {
//           console.error(e);
//           return done(e);
//         }

//         // Fill email, password and submit form
//         browser.
//           fill('form[name=createAccountForm] input[name=username]', 'zombie').
//           fill('form[name=createAccountForm] input[name=email]', 'zombie@underworld.dead').
//           fill('form[name=createAccountForm] input[name=password]', 'eat-the-living').
//           fill('form[name=createAccountForm] input[name=confirmPassword]', 'eat-the-living').
//           fill('form[name=createAccountForm] input[name=displayName]', 'The Zombie').

//           pressButton('registerUser', function(e) {
//             if (e) {
//               console.error(e);
//               return done(e);
//             }

//             // Form submitted, new page loaded.
//             assert.ok(browser.success);
//             // TODO add more tests and result validations
//             //
//             //sails.log.warn('>>>', browser.html());

//             done();
//           })
//       });
//     });
//   });

// });