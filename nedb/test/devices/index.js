var assert = require('chai').assert;
var devices = require('../../index').init().devices;
var shortid = require('shortid');
var userId = shortid.generate();
describe('NeDB connector: Device', function() {
  describe('retriveUserDevice api', function() {
    it('Retrieve this user devices should pass', function(done) {
      devices.retriveUserDevices({ createUserId: userId })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retriveAllDevices api', function() {
    it('Retrieve this user devices should pass', function(done) {
      devices.retriveAllDevices()
      .then(function(data) { done(); })
      .catch(done);
    });
  });

  describe('addNewDevice api', function() {
    it('Retrieve this user devices should pass', function(done) {
      devices.addNewDevice({
        createUserId: userId,
        deviceId: '123123',
        deviceKey: '123123',
        deviceName: 'test device Name',
        deviceDescription: '123123123',
        deviceImageURL: 'http://www.google.com',
        prototypeId: shortid.generate(),
      })
      .then(function(data) { done(); })
      .catch(done);
    });
  });

  describe('editDevices api', function() {
    it('Retrieve this user devices should pass', function(done) {
      devices.editDevices({
        createUserId: userId
      }, {
        deviceName: 'mcs lite no.1 device'
      })
      .then(function(data) { done(); })
      .catch(done);
    });
  });

});