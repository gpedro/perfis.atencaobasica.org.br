App.AuthRegisterController.reopen({
  registerUrl: '/signup',
  isChecked: false,
  actions: {
    register: function() {
      NProgress.start();
      NProgress.set(0.5);
      var self = this;
      var user = this.get('user');
      self.set('messages',[]);
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
