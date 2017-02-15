var request = require('supertest-as-promised');
var faker = require('faker');
var assert = require('chai').assert;

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123123';

require('../../bootstrap');

describe('Dashboard API:', function() {
  before(function(done) {
    new require('../users/login')(userName, email, password, true, mcs, done);
  });

  it('return 200.', function(done) {
    request(mcs)
    .get($rest.apiRoute + '/dashboard')
    .set('Authorization', 'Bearer ' + global.access_token)
    .then(function(data) {
      assert.equal(data.status, 200, 'Response status is not 200.');
      done();
    });
  });
});