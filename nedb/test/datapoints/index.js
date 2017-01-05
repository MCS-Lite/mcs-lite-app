var assert = require('chai').assert;
var datapoints = require('../../datapoints/index');

describe('Datapoint', function() {
  describe('uploadDatapoint api', function() {
    it('Upload a datapoint should pass', function(done) {
      datapoints.uploadDatapoint({
        deviceId: '123123',
        datachannel: 'qweqwewqe',
        timestamp: new Date().getTime(),
        data: 123123,
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retrieveDeviceAllDatapoint api', function(done) {
    it('retrieve all datapoint (by device) should pass', function() {
      datapoints.retrieveDeviceAllDatapoint({
        deviceId: '123123',
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retrieveDatachannelDatapoint api', function(done) {
    it('retrieve all datapoint (by datachannel) should pass', function() {
      datapoints.retrieveDatachannelDatapoint({
        deviceId: '123123',
        datachannel: 'qweqwewqe',
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

});