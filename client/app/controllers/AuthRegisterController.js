App.AuthRegisterController.reopen({
  registerUrl: '/signup',
  user: {},
  isChecked: false,
  actions: {
    register: function() {
      NProgress.start();
      NProgress.set(0.5);
      var self = this;
      var user = this.get('user');
      self.set('messages',[]);
      console.log('user', user);
      $.post(this.get('registerUrl'),user)
      .done(function(data) {
        NProgress.done(true);
        location.href = '/';
      })
      .fail(function(data) {
        NProgress.done(true);
        if (data.responseJSON.messages) {
          self.set('messages', data.responseJSON.messages);
        } else {
          Ember.Logger.error( 'Unknow error on register: ', data );
        }
      });
    }
  },

  usernameInvalid: true,

  checkAvailabity: function (){
    var self = this;
    // if (!self.get('user.isDirty')) {
    //   self.set('usernameInvalid', true);
    //   return Ember.$('#usernameResponse').text('');
    // }    
    if(!/^[A-Za-z]{3,20}$/.test(self.get('user.username'))){
      self.set('usernameInvalid', true);
      return Ember.$('#usernameResponse').text('Nome de usuário inválido');
    };
    Ember.$.get('/api/v1/auth/check-username-availability?username=' + self.get('user.username'), function(resp){            
      self.set('usernameInvalid', !resp.isAvaible);
      if (resp.isAvaible) {
        return Ember.$('#usernameResponse').text(self.get('inputHelpUsername'));
      } else {
        return Ember.$('#usernameResponse').text('Nome de usuário já existente');
      }
    });
  }.observes('user.username'),


  checkCPF: function (){
    console.log('checkCPF');
    var cpf = /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{3}\d{3}\d{3}\d{2}$)/;
    if(!cpf.test(this.get('user.cpf'))){
      return this.set('cpfErrMessage', 'CPF Inválido');
    }
    return this.set('cpfErrMessage', '');
  }.observes('user.cpf'),

  checkEmail: function (){

  }.observes('user.email'),

  checkConfirmEmail: function (){

  }.observes('user.confirmEmail'),

  checkPassword: function (){

  }.observes('user.password'),

  checkConfirmPassword: function (){

  }.observes('user.confirmPassword'),

  invalidForm: function (){
    console.log('Boolean', !Boolean(this.get('usernameInvalid') && this.get('cpfErrMessage') && this.get('emailErrMessage') && this.get('confirmEmailErrMessage') && this.get('passwordErrMessage') && this.get('confirmPasswordErrMessage') && this.get('isCheckedErrMessage')));
    return !Boolean(this.get('usernameInvalid') && this.get('cpfErrMessage') && this.get('emailErrMessage') && this.get('confirmEmailErrMessage') && this.get('passwordErrMessage') && this.get('confirmPasswordErrMessage') && this.get('isCheckedErrMessage'));
  }.property('usernameInvalid','cpfErrMessage', 'emailErrMessage', 'confirmEmailErrMessage', 'passwordErrMessage', 'confirmPasswordErrMessage', 'isCheckedErrMessage')          
});
