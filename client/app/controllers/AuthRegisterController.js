App.AuthRegisterController.reopen({
  registerUrl: '/signup',
  user: {},

  actions: {
    register: function() {
      NProgress.start();
      NProgress.set(0.5);
      var self = this;
      var user = this.get('user');
      self.set('messages',[]);
      $.post(this.get('registerUrl'),user)
      .done(function(data) {
        if (data.messages) {
          self.set('messages', data.messages);
        } else {
          Ember.Logger.info( 'Unknow success message on register: ', data );
        }
      })
      .fail(function(data) {
        if (data.responseJSON.messages) {
          self.set('messages', data.responseJSON.messages);
        } else {
          Ember.Logger.error( 'Unknow error on register: ', data );
        }
      })
      .always(function (){
        NProgress.done(true);
        $("html, body").animate({ scrollTop: 0 });
      });
    }
  },

  checkAvailabity: function (){
    var self = this;
    if(!/^[A-Za-z]{3,20}$/.test(self.get('user.username'))){
      return self.setProperties({
        usernameErr: true,
        usernameErrMessage: 'Nome de usuário inválido'
      });      
    };
    Ember.$.get('/api/v1/auth/check-username-availability?username=' + self.get('user.username'), function(resp){            
      if (resp.isAvaible) {
        return self.setProperties({
          usernameErr: false
        });  
      } else {
        return self.setProperties({
          usernameErr: true,
          usernameErrMessage: 'Nome de usuário já existente'
        });  
      }
    });
  }.observes('user.username'),


  checkCPF: function (){
    var cpf = /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{3}\d{3}\d{3}\d{2}$)/;
    if(!cpf.test(this.get('user.cpf'))) {
      return this.setProperties({
        cpfErr: true,
        cpfErrMessage: 'CPF inválido' 
      });
    }
    return this.setProperties({
      cpfErr: false      
    });
  }.observes('user.cpf'),

  checkEmail: function (){
    var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.test(this.get('user.email'))) {
      return this.setProperties({
        emailErr: true,
        emailErrMessage: 'Email inválido' 
      });
    } else if (this.get('user.email') != this.get('user.confirmEmail')) {
      return this.setProperties({
        emailErr: true,
        emailErrMessage: 'Os campos email e repetir email tem que ser iguais' 
      });
    } else {
      return this.setProperties({
        emailErr: false
      });
    }
  }.observes('user.email', 'user.confirmEmail'),

  checkConfirmEmail: function (){
    var email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.test(this.get('user.confirmEmail'))) {
      return this.setProperties({
        confirmEmailErr: true,
        confirmEmailErrMessage: 'Email inválido' 
      });
    } else if (this.get('user.email') != this.get('user.confirmEmail')) {
      return this.setProperties({
        confirmEmailErr: true,
        confirmEmailErrMessage: 'Os campos email e repetir email tem que ser iguais' 
      });
    } else {
      return this.setProperties({
        confirmEmailErr: false
      });
    }
  }.observes('user.confirmEmail'),

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
    var bool = Boolean( this.get('usernameErr') || Ember.isNone(this.get('user.username')) ||
                        this.get('cpfErr') || Ember.isNone(this.get('user.cpf')) || 
                        this.get('emailErr') || Ember.isNone(this.get('user.email')) ||
                        this.get('confirmEmailErr') || Ember.isNone(this.get('user.confirmEmail')) ||
                        this.get('passwordErr') || Ember.isNone(this.get('user.password')) || 
                        this.get('confirmPasswordErr') || Ember.isNone(this.get('user.confirmPassword')) ||
                        !this.get('isChecked') || Ember.isNone(this.get('isChecked')));
    return bool;
  }.property('usernameErr','cpfErr', 'emailErr', 'confirmEmailErr', 'passwordErr', 'confirmPasswordErr', 'isChecked')
});
