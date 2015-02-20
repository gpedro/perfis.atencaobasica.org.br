App.AuthForgotPasswordController.reopen({
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

  invalidForm: function (){
    var bool = Boolean( this.get('emailErr') || Ember.isEmpty(this.get('email')) )
    return bool;
  }.property('emailErr')  
});