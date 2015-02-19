App.AuthRegisterController.reopen({
  registerUrl: '/signup',
  user: {},
  isChecked: false,

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
  }
});
