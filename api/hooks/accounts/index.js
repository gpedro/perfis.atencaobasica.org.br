module.exports = function (sails) {
  sails.on('we:models:alter', function() {
    if (!sails.models.user.types) sails.models.user.types = {};

    var cpfRegex = new RegExp(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/);

    // custom cpf validation
    sails.models.user.types.cpf = function cpfValidation(cpf) {
      if (!cpf) return '';
      // remove uneed accents
      this.cpf = this.cpf.replace(/\./g, '').replace(/-/g, '');
      return cpfRegex.test(cpf);
    }

    // CPF field
    sails.models.user.attributes.cpf = {
      type: 'string',
      cpf: true,
      unique: true,
      required: true
    };
  });

  return {

    /**
     * initialize hook
     *
     * @param  {Function} cb  callback
     */
    initialize: function (cb) {
      cb();
    }
  }
}