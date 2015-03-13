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

  // /test/testSendAccountValidationEmail?email=[seuemailaqui]
  testSendAccountValidationEmail: function(req, res) {
    var sails = req._sails;

    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');

    if (!email) return res.status(400).send('adicione o email na url para testar ?email=[eu email]');
    var user  =  {
      displayName: 'Afro Samuray',
      username: 'afrosamuray',
      email: email,
      id: 1,
      userId: 1
    };

    var sendAccontActivationEmail = require(sails.config.appPath + '/node_modules/we-plugin-auth/lib/email/accontActivationEmail.js');

    return sendAccontActivationEmail(user, 'https://perfis.atencaobasica.org.br', sails, function(err) {
      if(err) {
        sails.log.error('Action:Login sendAccontActivationEmail:',err, user);
        return res.serverError('Error on send activation email for new user', user);
      }

      res.send('201',{
        messages: [
          {
            status: 'warning',
            message: 'Mandei o email para:' + user.email
          }
        ]
      });

    })
  },

  // /test/testAuthChangePasswordEmail?email=[seuemailaqui]
  testAuthChangePasswordEmail: function(req, res) {
    var sails = req._sails;

    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');
    if (!email) return res.status(400).send('adicione o email na url para testar ?email=[eu email]');

    var user  =  {
      displayName: 'Afro Samuray',
      username: 'afrosamuray',
      email: email
    };

    var sendAccontActivationEmail = require(sails.config.appPath + '/node_modules/we-plugin-auth/lib/email/accontActivationEmail.js');

    var options = {
      email: user.email,
      subject: req._sails.config.appName + ' - ' + req.__('auth.change-password.reset-password'),
      from: req._sails.config.email.siteEmail
    };

    var templateVariables = {
      user: {
        name: user.username,
        displayName: user.displayName
      },
      site: {
        name: req._sails.config.appName,
        url: sails.config.hostname
      }
    };  

    sails.email.sendEmail(options, 'AuthChangePasswordEmail', templateVariables, function(err , emailResp){
      if (err) {
        sails.log.error('Error on send email AuthChangePasswordEmail', err, emailResp);
      }

      res.locals.messages = [{
        status: 'success',
        type: 'updated',
        message: req.__('auth.change-password.success')
      }];

      sails.log.info('AuthChangePasswordEmail: Email resp:', emailResp);

      if (req.wantsJSON) {
        return res.send('200',{ messages: res.locals.messages });
      }
      return sails.controllers.auth.changePasswordPage(req, res, next);

    });
  },

  testAuthResetPasswordEmail: function (req, res) {
    var sails = req._sails;

    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');
    if (!email) return res.status(400).send('adicione o email na url para testar ?email=[eu email]');

    var user  =  {
      displayName: 'Afro Samuray',
      username: 'afrosamuray',
      email: email
    };

    var appName = req._sails.config.appName;

    var options = {
      email: user.email,
      subject: appName + ' - ' + req.__('auth.forgot-password.reset-password'),
      from: req._sails.config.email.siteEmail
    };

    var templateVariables = {
      user: {
        name: user.username,
        displayName: user.displayName
      },
      site: {
        name: appName,
        slogan: 'MIMI one slogan here',
        url: sails.config.hostname
      },
      resetPasswordUrl: 'https://perfis.atencaobasica.org.br'
    };

    sails.email.sendEmail(options, 'AuthResetPasswordEmail', templateVariables, function(err , emailResp){
      if (err) {
        sails.log.error('Error on send email AuthResetPasswordEmail', err, emailResp);
      }

      sails.log.info('AuthResetPasswordEmail: Email resp:', emailResp);
      
      res.send({
        success: [{
          type: 'email_send',
          status: 'success',
          message: 'Enviei um email para :' + options.email
        }]
      });
 
    });
  },

  testAuthResetPasswordEmail: function (req, res) {
    var sails = req._sails;

    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');
    if (!email) return res.status(400).send('adicione o email na url para testar ?email=[eu email]');

    var user  =  {
      displayName: 'Afro Samuray',
      username: 'afrosamuray',
      email: email
    };

    var appName = req._sails.config.appName;

    var options = {
      email: user.email,
      subject: appName + ' - ' + req.__('auth.forgot-password.reset-password'),
      from: req._sails.config.email.siteEmail
    };

    var templateVariables = {
      user: {
        name: user.username,
        displayName: user.displayName
      },
      site: {
        name: appName,
        slogan: 'MIMI one slogan here',
        url: sails.config.hostname
      },
      resetPasswordUrl: 'https://perfis.atencaobasica.org.br'
    };

    sails.email.sendEmail(options, 'AuthResetPasswordEmail', templateVariables, function(err , emailResp){
      if (err) {
        sails.log.error('Error on send email AuthResetPasswordEmail', err, emailResp);
      }

      sails.log.info('AuthResetPasswordEmail: Email resp:', emailResp);
      
      res.send({
        success: [{
          type: 'email_send',
          status: 'success',
          message: 'Enviei um email para :' + options.email
        }]
      });
 
    });
  },

  testMembershipInviteEmail: function(req, res) {
    var sails = req._sails;
    if (sails.config.environment == 'production') return res.notFound();

    var appName = req._sails.config.appName;

    var email = req.param('email');

    if (!email) email = 'contato@albertosouza.net';

    var options = {
      email: email,
      subject: appName + ' - ' + req.__('auth.forgot-password.reset-password'),
      from: req._sails.config.email.siteEmail
    };

    var templateVariables = {
      user: {
        displayName: 'Afro Samuray',
        username: 'afrosamuray',
        email: email
      },
      site: {
        name: appName,
        url: sails.config.hostname
      },
      inviteUrl: 'https://perfis.atencaobasica.org.br'
    };

    sails.email.sendEmail(options, 'MembershipInviteEmail', templateVariables, function(err , emailResp){
      if (err) {
        sails.log.error('Error on send email AuthResetPasswordEmail', err, emailResp);
      }

      sails.log.info('AuthResetPasswordEmail: Email resp:', emailResp);
      
      res.send({
        success: [{
          type: 'email_send',
          status: 'success',
          message: 'Enviei um email para :' + options.email
        }]
      });
    });
  },

  testRelatoInviteEmail: function(req, res) {
    var sails = req._sails;
    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');

    if (!email) email = 'contato@albertosouza.net';

    var appName;
    sails.config.appName ? appName = sails.config.appName : appName = 'We.js';

    var options = {
      email: email,
      subject: appName + ' - ' + res.i18n('Relato Ator')
    };

    var templateVariables = {
      user:{
        username: 'afrosamuray',
        displayName: 'afrosamuray'
      },
      site: {
        name: appName,
        url: req.baseUrl
      },
      relato: 'Meu relato de experiencia',
      modalidade: 'autor',
      inviteUrl: 'https://perfis.atencaobasica.org.br'
    };

    // Send email to user with the acceptence link
    sails.email.sendEmail(options, 'RelatoInviteEmail', templateVariables, function (err, emailRes){
      if(err){
        sails.log.error(err);
      }            
      res.status(201);
      res.send({massage: 'Opa mandei o email: ' + email});
    }) 
  },

  testRelatoInviteNewUserEmail: function(req, res) {
    var sails = req._sails;
    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');
    if (!email) email = 'contato@albertosouza.net';

    var appName;
    sails.config.appName ? appName = sails.config.appName : appName = 'We.js';

    var options = {
      email: email,
      subject: appName + ' - ' + res.i18n('Relato Ator')
    };            

    var templateVariables = {
      email: email,
      site: {
        name: appName,
        slogan: 'MIMI one slogan here',
        url: req.baseUrl
      },
      relato: 'Meu Relato!',
      modalidade: 'ator',
      invitePending: 'https://perfis.atencaobasica.org.br'
    };

    var emailTemplateToUse = 'RelatoInviteNewUserEmail';


    options.email = email;              
    templateVariables.user = {
      displayName: 'Afro Samuray',
      username: 'afrosamuray'
    }
    templateVariables.inviteUrl = 'https://perfis.atencaobasica.org.br';
    delete templateVariables.email;
    delete templateVariables.invitePending;

    emailTemplateToUse = 'RelatoInviteEmail';


    // Send email to user with the acceptence link
    sails.email.sendEmail(options, emailTemplateToUse, templateVariables, function (err, emailRes){
      if(err){
        sails.log.error(err);
      }            

      res.status(201);
      res.send({message: 'mandei o email para: '+email});

    }) 
  },

  testuserNotifications: function(req, res) {
    var sails = req._sails;
    if (sails.config.environment == 'production') return res.notFound();

    var email = req.param('email');
    if (!email) email = 'contato@albertosouza.net';

    var appName;
    sails.config.appName ? appName = sails.config.appName : appName = 'We.js';

    var options = {
      email: email,
      subject: appName + ' - ' + res.i18n('Relato Ator')
    }; 

    var templateVariables = {
      email: email,
      user: {
        displayName: 'Afro Samuray',

      },
      site: {
        name: appName,
        url: req.baseUrl
      },
      notifications: [
        {
          emailLink: 'https://perfis.atencaobasica.org.br',
          emailText: 'O Homem Aranha pulou pela janela'
        },
        {
          emailLink: 'https://perfis.atencaobasica.org.br',
          emailText: 'O Super man salvou o planeta'
        }        

      ]
    };

    // Send email to user with the acceptence link
    sails.email.sendEmail(options, 'userNotifications', templateVariables, function (err, emailRes){
      if(err){
        sails.log.error(err);
      }            

      res.status(201);
      res.send({message: 'mandei o email para: '+email});

    })
  }

}


// <h1 class="email-title">Oi <%= user.displayName %></h1>

// <h2 class="notification-title">Email de notificação</h2>
// <table class="notitication-table">
// <% notifications.forEach(function(notification, index) { %>
//   <tr>
//     <td><a class="notification-link" href="<%= notification.emailLink %>">
//       <%- notification.emailText %>...
//     </a></td>
//   </tr>
// <% }); %>
// </table>

// <div class="footer">
//   Cheers,
//   <%= site.name %> team
// </div>