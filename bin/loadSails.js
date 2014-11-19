var Sails = require('sails');

module.exports = function loadSails(cb){
  Sails.load({
    port: 1930,
    hooks: {
      grunt: false,
      socket: false,
      pubsub: false
    }
  },function(err, sails) {
  if (err) {
    return cb(err);
  }
    // here you can load fixtures, etc.
    cb(err, sails);
  });
}
