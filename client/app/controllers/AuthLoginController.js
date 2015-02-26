App.AuthLoginController.reopen({
	loginUrl: '/login',

  actions: {
    //Submit the modal
    login: function() {
      NProgress.start();
      NProgress.set(0.5);
      var self = this;
      
      $.post( this.get('loginUrl') ,{
        email: this.get('email'),
        password: this.get('password')
      })
      .done(function(data) {
        // if sucessfull login reload the page
        location.reload();
      })
      .fail(function(data) {
        if (data.responseText) {
          var responseJSON = jQuery.parseJSON(data.responseText);
          // console.log('responseJSON', responseJSON);
          self.set('messages', [{
            status: 'danger',
            message: responseJSON.messages[0].message
          }]);
        } else {
          Ember.Logger.error( 'Error on login',data);
        }
      }).always(function() {
        NProgress.done(true);
        $("html, body").animate({ scrollTop: 0 });
      });
    },
    goToForgotPaswordPage: function(){
      this.get('router').transitionTo('authForgotPassword');
    },

    goToRegisterPage: function(){
      this.get('router').transitionTo('authRegister');
    }
  },

	checkEmail: function (){
		if (Ember.isEmpty(this.get('email'))) {
			return this.setProperties({
        emailErr: true,
        emailErrMessage: null
      });
		}
    var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.test(this.get('email'))) {
      return this.setProperties({
        emailErr: true,
        emailErrMessage: 'Email inválido' 
      });
    } else {
      return this.setProperties({
        emailErr: false
      });
    }
  }.observes('email'),

  checkPassword: function (){
  	if (Ember.isEmpty(this.get('password'))) {
			return this.setProperties({
        passwordErr: true,
       	passwordErrMessage: null
      });
		}
    if (!this.get('password')) {
      return this.setProperties({
        passwordErr: true,
        passwordErrMessage: 'A senha é obrigatória' 
      });      
    } else {
      return this.setProperties({
        passwordErr: false
      });      
    }
  }.observes('password'),

  invalidForm: function (){
    var bool = Boolean( this.get('emailErr') || Ember.isEmpty(this.get('email')) ||
                        this.get('passwordErr') || Ember.isEmpty(this.get('password')) )
    return bool;
  }.property('emailErr', 'passwordErr')  
})