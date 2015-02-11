App.AuthRegisterController.reopen({
  registerUrl: '/signup',
  actions: {
    register: function() {
      alert('submit');
      var self = this;
      var user = this.get('user');
      self.set('messages',[]);
      console.log(user);
      $.post(this.get('registerUrl'),user)
      .done(function(data) {
        console.log('sucesso', data);
        location.href = '/';
      })
      .fail(function(data) {
        console.log('erro', data);
        if (data.responseJSON.messages) {
          self.set('messages', data.responseJSON.messages);
        } else {
          Ember.Logger.error( 'Unknow error on register: ', data );
        }
      });
    }
  }
});
