(function($, we, Ember, App){
	App.AuthLoginView = Ember.View.extend({
		templateName: 'auth/Login',
		didInsertElement: function (){
		  Ember.$('.user-login-form').bootstrapValidator({
		    message: 'Valor inválido',    
		    fields:{
		      email: {
		        validators: {
		          notEmpty: {
		            message: 'Email é obrigatório'
		          },
		          regexp: {
		            regexp: '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
		            message: 'Email inválido'                
		          }             
		        }
		      },        
		    }
		  });
		},	  
	});
})(jQuery, we, Ember, App);