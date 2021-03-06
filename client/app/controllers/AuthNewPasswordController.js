App.AuthNewPasswordController.reopen({
	user: {},

	actions: {
    submit: function() {
      NProgress.start();
      NProgress.set(0.5);

      var self = this;
      var newPassword = self.get('user.password');
      var rNewPassword = self.get('user.confirmPassword');

      $.post(we.configs.server.providers.accounts + '/auth/new-password', {
        newPassword: newPassword,
        rNewPassword: rNewPassword
      })
      .done(function(data) {
        if (data && data.messages) {
          self.set('messages', data.messages);
        } else {
          Ember.Logger.info('Unknown success message:', data.responseJSON);
        }
        setTimeout(function (){
          self.transitionToRoute('home');
        }, 3000);        
      })
      .fail(function(data) {
        if (data.responseJSON.messages) {
          self.set('messages', data.responseJSON.messages);  
        } else {
          Ember.Logger.error('Unknow error on change password:', data.responseJSON);
        }        
      })
      .always(function (){
        NProgress.done(true);
        $("html, body").animate({ scrollTop: 0 });
      });
    }		
	},

	checkPassword: function (){
    if (!this.get('user.password')) {
      return this.setProperties({
        passwordErr: true,
        passwordErrMessage: 'A senha é obrigatória' 
      });      
    } else if (this.get('user.password') != this.get('user.confirmPassword')){
      return this.setProperties({
        passwordErr: true,
        passwordErrMessage: 'Os campo senha e repetir senha tem que ser iguais'
      });      
    } else {
      return this.setProperties({
        passwordErr: false
      });      
    }
  }.observes('user.password', 'user.confirmPassword'),

  checkConfirmPassword: function (){  
    if (!this.get('user.confirmPassword')) {
      return this.setProperties({
        confirmPasswordErr: true,
        confirmPasswordErrMessage: 'Repetir senha é obrigatório' 
      });      
    } else if (this.get('user.password') != this.get('user.confirmPassword')){
      return this.setProperties({
        confirmPasswordErr: true,
        confirmPasswordErrMessage: 'Os campo senha e repetir senha tem que ser iguais' 
      });      
    } else {
      return this.setProperties({
        confirmPasswordErr: false
      });      
    }
  }.observes('user.confirmPassword'),

  invalidForm: function (){
    var bool = Boolean( this.get('passwordErr') || Ember.isNone(this.get('user.password')) || 
                        this.get('confirmPasswordErr') || Ember.isNone(this.get('user.confirmPassword')));
    return bool;
  }.property('passwordErr', 'confirmPasswordErr')  
})