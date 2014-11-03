
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
            message: 'O nome de usuário não está disponível'
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
      }
    }
  });
});