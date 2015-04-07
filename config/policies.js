var context = require('sails-context').sails.police;

module.exports.policies = {
  '*':  [context, defaultPolicy]
}

function defaultPolicy(req, res, next) {

  if (!req.isAuthenticated() || !req.user.isAdmin) {
    if (req.options && req.options.action) {
      if (req.options.action == 'find' || req.options.action == 'findOne') {
        if( req.param('email') || req.param('cpf')) {
          sails.log.warn('Only admins can search users by cpf | TODO change to check if user can update with acl:', req.param('email'), req.param('cpf'));
          return res.forbidden();
        }
      }
    }
  }

  if (!req.options) return next();

  if (res.header) {
    // set header to never cache API responses for skip IE 11 cache bug
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
  }

  req._sails.acl.canPolicy(req, function(err, can) {
    if(err) return res.serverError(err);
    if(can === false) return res.forbidden();
    return next();
  })
}