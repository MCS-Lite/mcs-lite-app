before(function(done){
  this.timeout(0);
  var mcs = require('../index');
  global.mcs = mcs;
  mcs.listen(3000);
  done();
});