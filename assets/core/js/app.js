
$( document ).ready(function() {
  $('#username').checkAvailability();

  $('.user-signup-form').bootstrapValidator({
    message: 'Valor invalido',
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      //invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        message: 'O nome de usuário não é valido',
        validators: {
          notEmpty: {
            message: 'Campo nome de usuário é obrigatório'
          },
          stringLength: {
            min: 4,
            max: 30,
            message: 'o nome de usuário deve ter entre 4 e 30 letras'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_]+$/,
            message: 'O nome de usuário só pode ter letras, numeros e sublinhado'
          },
          username: {
            message: 'O nome de usuário não está disponível'
          }
        }
      },
      cpf: {
        validators: {
          notEmpty: {
            message: 'Campo cpf é obrigatório'
          },
          id: {
            country: 'BR',
            message: 'Número de CPF inválido.'
          }
        }
      },

      email: {
        validators: {
          notEmpty: {
            message: 'Campo email é obrigatório'
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: 'Campo senha é obrigatório'
          },
          identical: {
            field: 'confirmPassword',
            message: 'O campo de senha precisa ser igual ao campo de repetir senha'
          }
        }
      },
      confirmPassword: {
        validators: {
          notEmpty: {
            message: 'Campo repetir senha é obrigatório'
          },
          identical: {
            field: 'password',
            message: 'O campo de confirmar senha precisa ser igual ao campo de senha'
          }
        }
      },

      termos: {
        validators: {
          notEmpty: {
            message: 'Para criar uma conta você deve aceitar os termos de uso.'
          }
        }
      }
    }
  });
});