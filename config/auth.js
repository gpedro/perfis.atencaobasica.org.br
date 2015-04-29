module.exports.auth = {
  callLandingPage: function (landingPage, req, res, next) {
    if ( req.user.aboutMe && req.path === '/' ) {
    	return res.redirect(landingPage);
    }
    return next();
  }
}
