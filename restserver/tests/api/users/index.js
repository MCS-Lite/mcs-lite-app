var request = require('supertest-as-promised');
var faker = require('faker');
var assert = require('chai').assert;
var mcs = require('../../../index');
mcs.listen(3000);

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123213';

describe('Oauth API:', function() {

  before(function(done) {
    return new require('./login')(userName, email, password, true, mcs, done);
  });

  describe('Retrieve user list (by admin) api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .get('/users')
      .set('Authorization', 'Bearer ' + global.access_token)
      .then(function(data) {
        console.log(data);
        global.access_token = data.body.access_token;
        global.refresh_token = data.body.refresh_token;
        done();
      });
    });
  });

});