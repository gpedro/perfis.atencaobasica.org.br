/**
 * MainController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

var actionUtil = require('we-helpers').actionUtil,
  util = require('util'),
  converter = require('sails-emberjs-model-converter'),
  staticEmberModels;

module.exports = {
  index: function (req, res) {
    // index / homepage
    if(req.isAuthenticated()){
      res.redirect('/profile/' + req.user.id + '/edit');
    }else{
      res.redirect('login');
    }
  },

  /**
   * Auto generate Ember.js App
   *
   */
  getEmberApp: function(req, res) {
    var fs = require('fs');

    var sails = req._sails;
    var appFilePath = sails.config.appPath + '/assets/emberApp.js';

    fs.readFile( appFilePath, function (err, emberAppFile) {
      if (err) throw err;

			// ___ MODELS
	    // cache models it in a global and static variable
	    if ( !staticEmberModels) {
	      staticEmberModels = converter.convertMultipleToEmberJSFile(sails.models)
	    }
	    emberAppFile += staticEmberModels;

	    //  send as javascript file
	    res.set('Content-Type', 'application/javascript');


      emberAppFile +=  ' App.advanceReadiness();';


	    res.send(emberAppFile);

    });
  },

  currentUserEditProfile: function(req, res) {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.redirect('/profile/' + req.user.id + '/edit');
  },


  // - rotas de teste de email
  // 

  testSendAccountValidationEmail: function(req, res) {
    var sails = req._sails;

    if (sails.config.environment == 'production') return res.notFound();

    var sendAccontActivationEmail = require(sails.config.appPath + '/node_modules/we-plugin-auth/lib/email/accontActivationEmail.js');

    var user = sails.models.user.findOne(51144)
    .exec(function (err, user) {
      if (err) return res.serverError(err);
      return sendAccontActivationEmail(user, 'https://perfis.atencaobasica.org.br', sails, function(err) {
        if(err) {
          sails.log.error('Action:Login sendAccontActivationEmail:',err);
          return res.serverError('Error on send activation email for new user', user);
        }

        res.send('201',{
          messages: [
            {
              status: 'warning',
              message: req.__('Account created but is need an email validation\n, One email was send to %s with instructions to validate your account', user.email)
            }
          ]
        });

      });
    })

  }

}
