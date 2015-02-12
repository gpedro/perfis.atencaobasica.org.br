(function($, we, Ember, App){

  App.AuthNewPasswordController = Ember.ObjectController.extend({
    messages: [],
    init: function init(){
      this._super();
      this.set('newPasswordURL',we.configs.server.providers.accounts+'/auth/new-password');
    },

    actions: {
      setNewPassword: function (){
        NProgress.start();
        NProgress.set(0.5);
        var _this = this;
        $.post( this.get('newPasswordURL') ,{
          newPassword: this.get('newPassword'),
          rNewPassword: this.get('rNewPassword')
        })
        .done(function(data) {
          NProgress.done(true);
          _this.transitionToRoute('home');
        })
        .fail(function(data) {
          NProgress.done(true);
          if(data.responseText){
            var responseJSON = jQuery.parseJSON(data.responseText);
            console.log('responseJSON', responseJSON);
            _this.set('messages', [{
              status: 'danger',
              message: responseJSON.messages[0].message
            }]);
          }else{
            console.error( 'Error on login',data);
          }
        });
      }
    }
  });

})(jQuery, we, Ember, App);