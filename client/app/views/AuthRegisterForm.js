// (function($, we, Ember, App){
// 	App.AuthRegisterFormView = Ember.View.extend({
// 		templateName: 'auth/RegisterForm',
// 		didInsertElement: function (){
			// $('#email').jqBootstrapValidation();
		  // $('#username').checkAvailability();

		  // $('.user-signup-form').bootstrapValidator({
		  //   message: 'Valor invalido',
		  //   feedbackIcons: {
		  //     valid: 'glyphicon glyphicon-ok',
		  //     //invalid: 'glyphicon glyphicon-remove',
		  //     validating: 'glyphicon glyphicon-refresh'
		  //   },
		  //   fields: {
		  //     username: {
		  //       message: 'O nome de usuário não é valido',
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Campo nome de usuário é obrigatório'
		  //         },
		  //         stringLength: {
		  //           min: 4,
		  //           max: 30,
		  //           message: 'o nome de usuário deve ter entre 4 e 30 letras, todas minúsculas'
		  //         },
		  //         regexp: {
		  //           regexp: /^[a-z0-9_]+$/,
		  //           message: 'O nome de usuário só pode ter letras minúsculas, numeros e sublinhado'
		  //         },
		  //         username: {
		  //           message: 'O nome de usuário não está disponível'
		  //         }
		  //       }
		  //     },
		  //     cpf: {
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Campo cpf é obrigatório'
		  //         },
		  //         id: {
		  //           country: 'BR',
		  //           message: 'Número de CPF inválido.'
		  //         }
		  //       }
		  //     },

		  //     email: {
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Campo email é obrigatório'
		  //         },
		  //         identical: {
		  //           field: 'confirmEmail',
		  //           message: 'O campo de email precisa ser igual ao campo de repetir email'
		  //         }
		  //       }
		  //     },

		  //     confirmEmail: {
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Campo repetir email é obrigatório'
		  //         },
		  //         identical: {
		  //           field: 'email',
		  //           message: 'O campo de repetir email precisa ser igual ao campo de email'
		  //         }          
		  //       }
		  //     },      

		  //     password: {
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Campo senha é obrigatório'
		  //         },
		  //         identical: {
		  //           field: 'confirmPassword',
		  //           message: 'O campo de senha precisa ser igual ao campo de repetir senha'
		  //         }
		  //       }
		  //     },
		  //     confirmPassword: {
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Campo repetir senha é obrigatório'
		  //         },
		  //         identical: {
		  //           field: 'password',
		  //           message: 'O campo de confirmar senha precisa ser igual ao campo de senha'
		  //         }
		  //       }
		  //     },

		  //     termos: {
		  //       validators: {
		  //         notEmpty: {
		  //           message: 'Para criar uma conta você deve aceitar os termos de uso.'
		  //         }
		  //       }
		  //     }
		  //   }
		  // });
// 		},	  
// 	});
// })(jQuery, we, Ember, App);