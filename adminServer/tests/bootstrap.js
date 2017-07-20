before(function(done){
  this.timeout(0);
  var mcs = require('../index');
  var $rest = require('../../configs/rest');

  global.mcs = mcs;
  global.$rest = $rest;
  mcs.listen(3000);
  done();
});