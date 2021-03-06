/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  // homepage
  'get /': {
    controller: 'main',
    action: 'index'
  },

  'get /emberjs/app.js': {
    controller: 'main',
    action: 'getEmberApp'
  },

  'get /current-user-profile': {
    controller: 'main',
    action: 'currentUserEditProfile'
  },

  'get /render-menu': {
    controller: 'main',
    action: 'renderMenu'
  },

  // dev test routes
  'get /test/testSendAccountValidationEmail': {
    controller: 'main',
    action: 'testSendAccountValidationEmail'
  },

  'get /test/testAuthChangePasswordEmail': {
    controller: 'main',
    action: 'testAuthChangePasswordEmail'
  },

  'get /test/testAuthResetPasswordEmail': {
    controller: 'main',
    action: 'testAuthResetPasswordEmail'
  },
  'get /test/testMembershipInviteEmail': {
    controller: 'main',
    action: 'testMembershipInviteEmail'
  },
  'get /test/testRelatoInviteEmail': {
    controller: 'main',
    action: 'testRelatoInviteEmail'
  },

  'get /test/testRelatoInviteNewUserEmail': {
    controller: 'main',
    action: 'testRelatoInviteNewUserEmail'
  },

  'get /test/testuserNotifications': {
    controller: 'main',
    action: 'testuserNotifications'
  }
}
