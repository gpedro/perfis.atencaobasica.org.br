
(function($, Ember, App){

  App.Router.map(function() {
    // auth
    this.route('authRegister',{path: '/signup'});
    this.route('authLogin',{path: '/login'});
    this.route('authForgotPassword',{path: '/auth/forgot-password'});
    this.route('authNewPassword',{path: '/auth/:userId/new-password'});

  });

  App.AuthLoginRoute = Ember.Route.extend(App.UnAuthenticatedRouteMixin, {
    renderTemplate: function (){
      this.render('auth/Login');
    },

    model: function() {
      return {
        email: '',
        password: '',
        messages: []
      };
    }    
  });

  App.AuthRegisterRoute = Ember.Route.extend(App.UnAuthenticatedRouteMixin, {
    beforeModel: function (transition, queryParams) {
      this._super(transition, queryParams);
    },

    renderTemplate: function() {
      this.render('auth/RegisterForm');
    },

    model: function() {
      return {
        messages: []
      };
    },

    controllerName: 'AuthRegister'
  });

  App.AuthForgotPasswordRoute = Ember.Route.extend(App.UnAuthenticatedRouteMixin, {
    renderTemplate: function() {
      this.render('auth/ForgotPassword');
    },
    model: function() {
      return {
        email: '',
        messages: []
      };
    }
  });  

  App.AuthNewPasswordRoute = Ember.Route.extend(App.AuthenticatedRouteMixin, {
    renderTemplate: function() {
      this.render('auth/NewPassword');
    },
    model: function(params) {
      return {
        currentUser: App.currentUser,
        userId: params['userId']
      };
    },
    afterModel: function (model){
      if (model.currentUser.get('id') != model.userId) this.transitionTo('home');
    }
  });  


})(jQuery, Ember, App);