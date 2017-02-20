var request = require('supertest-as-promised');
var faker = require('faker');
var assert = require('chai').assert;

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123123';

require('../../bootstrap');

describe('Devices API:', function() {
  before(function(done) {
    new require('../users/login')(userName, email, password, true, mcs, done);
  });

  before(function(done) {
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
      global.prototypeId = data.body.data.prototypeId;
      done();
    });
  });

  before(function(done) {
    request(mcs)
      .post($rest.apiRoute + '/prototypes/' + prototypeId + '/datachannels')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        datachannelId: '123123',
        datachannelDescription: 'Test datachannel',
        datachannelTypeId: 1,
        config: {},
      })
      .then(function(data) {
        assert.equal(data.status, 200, 'Response status is not 200.');
        data = data.body.data;
        global.datachannelId = data.datachannelId;
        done();
      });
  });

  describe('Retrieve user device list (by user) api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .get($rest.apiRoute + '/devices')
      .set('Authorization', 'Bearer ' + global.access_token)
      .then(function(data) {
        done();
      });
    });
  });

  describe('Add new device api:', function() {
    it('return 200.', function(done) {

      request(mcs)
      .post($rest.apiRoute + '/devices')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        prototypeId: prototypeId,
        deviceName: 'Test device',
        deviceDescription: 'This is a desc',
        deviceImageURL: 'http://www.google.com',
      })
      .then(function(data) {
        assert.equal(data.status, 200, 'Response status is not 200.');
        data = data.body.data;
        global.deviceId = data.deviceId;
        global.deviceKey = data.deviceKey;
        done();
      });
    });

    it('return 400.', function(done) {
      request(mcs)
      .post($rest.apiRoute + '/devices')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        deviceName: 'Test device',
        deviceDescription: 'This is a desc',
        deviceImageURL: 'http://www.google.com',
      })
      .expect(400)
      .end(done);
    });
  });

  describe('Retrieve devices api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .get($rest.apiRoute + '/devices/' + deviceId)
      .set('Authorization', 'Bearer ' + global.access_token)
      .expect(200)
      .end(done);
    });
  });

  describe('Edit devices api:', function() {
    it('return 200.', function(done) {
      var newDeviceName = 'This is test device123';

      request(mcs)
      .put($rest.apiRoute + '/devices/' + deviceId)
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        deviceName: newDeviceName,
      })
      .then(function(data) {
        assert.equal(data.body.message, 'success', 'Response is not success.');
        return request(mcs)
        .get($rest.apiRoute + '/devices/' + deviceId)
        .set('Authorization', 'Bearer ' + global.access_token);
      })
      .then(function(data) {
        assert.equal(data.body.data.deviceName, newDeviceName, 'This prototype is not equal.')
        done();
      });
    });
  });

  describe('Set device public api:', function() {
    it('return 200.', function(done) {

      request(mcs)
      .post($rest.apiRoute + '/devices/' + deviceId + '/public')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        isPublic: true,
      })
      .then(function(data) {
        assert.equal(data.body.message, 'success', 'Response is not success.');
        done();
      });
    });
  });
   describe('Delete device api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .delete($rest.apiRoute + '/devices/' + deviceId)
      .set('Authorization', 'Bearer ' + global.access_token)
      .then(function(data) {
        console.log(data.body);
        assert.equal(data.body.message, 'success', 'Response is not success.');
        done();
      });
    });
  });
});