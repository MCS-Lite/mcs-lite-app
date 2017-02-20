var assert = require('chai').assert;
var prototypes = require('../../index').init().prototypes;
var shortid = require('shortid');
var userId = shortid.generate();

describe('NeDB connector: Prototypes', function() {
  describe('retriveUserPrototype api', function() {
    it('Retrieve this user prototypes should pass', function(done) {
      prototypes.retriveUserPrototypes({ userId: userId })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retriveAllPrototypes api', function() {
    it('Retrieve all prototypes should pass', function(done) {
      prototypes.retriveAllPrototypes()
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('retriveAllTemplatesPrototypes api', function() {
    it('Retrieve all template prototypes should pass', function(done) {
      prototypes.retriveAllTemplatesPrototypes()
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('addNewPrototype api', function() {
    it('Add New prototypes should pass', function(done) {
      prototypes.addNewPrototype({
        createUserId: userId,
        prototypeName: 'test prototype Name',
        prototypeDescription: '123123123',
        prototypeImageURL: 'http://www.google.com',
        version: '0.0.1',
        isTemplate: false,
      })
      .then(function(data) {
        done();
      })
      .catch(done);
    });
  });

  describe('updatePrototype api', function() {
    it('Update user prototypes should pass', function(done) {
       prototypes.editPrototype({
        createUserId: userId
      }, {
        deviceName: 'mcs lite no.1 prototypes'
      })
      .then(function(data) { done(); })
      .catch(done);
    });
  });

});