var request = require('supertest-as-promised');
var faker = require('faker');
var assert = require('chai').assert;

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123123';

require('../../bootstrap');

describe('Prototype API:', function() {

  before(function(done) {
    new require('../users/login')(userName, email, password, true, mcs, done);
  });

  describe('Retrieve user prototype list (by user) api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .get($rest.apiRoute + '/prototypes')
      .set('Authorization', 'Bearer ' + global.access_token)
      .then(function(data) {
        done();
      });
    });
  });

  describe('Add new prototype api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .post($rest.apiRoute + '/prototypes')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        prototypeName: 'This is test prototype',
        prototypeDescription: 'This is test prototype',
        prototypeImageURL: 'http://www.google.com',
        version: '0.0.1',
      })
      .then(function(data) {
        assert.equal(data.status, 200, 'Response status is not 200.');
        data = data.body.data;
        global.prototypeId = data.prototypeId;
        global.prototypeKey = data.prototypeKey;
        done();
      });
    });

    it('return 400.', function(done) {
      request(mcs)
      .post($rest.apiRoute + '/prototypes')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        prototypeDescription: 'This is test prototype',
        prototypeImageURL: 'http://www.google.com',
        version: '0.0.1',
      })
      .expect(400)
      .end(done);
    });
  });

  describe('Retrieve prototype api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .get($rest.apiRoute + '/prototypes/' + prototypeId)
      .set('Authorization', 'Bearer ' + global.access_token)
      .expect(200)
      .end(done);
    });
  });

  describe('Edit prototype api:', function() {
    it('return 200.', function(done) {
      var newPrototypeName = 'This is test prototype123';

      request(mcs)
      .put($rest.apiRoute + '/prototypes/' + prototypeId)
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        prototypeName: newPrototypeName,
      })
      .then(function(data) {
        assert.equal(data.body.message, 'success', 'Response is not success.');
        return request(mcs)
        .get($rest.apiRoute + '/prototypes/' + prototypeId)
        .set('Authorization', 'Bearer ' + global.access_token);
      })
      .then(function(data) {
        assert.equal(data.body.data.prototypeName, newPrototypeName, 'This prototype is not equal.')
        done();
      });
    });
  });
});