var request = require('supertest-as-promised');
var faker = require('faker');
var assert = require('chai').assert;

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123123';

require('../../bootstrap');

describe('Datachannel API:', function() {
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

  describe('Add new datachannel api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .post($rest.apiRoute + '/prototypes/' + prototypeId + '/datachannels')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        name: 'werwerwerwer',
        id: '123123',
        description: 'Test datachannel',
        channelType: {
          id: 1,
          name: '123',
        },
        type: 1,
        isHidden: true,
        format: {},
      })
      .then(function(data) {
        assert.equal(data.status, 200, 'Response status is not 200.');
        data = data.body.data;
        global.datachannelId = data.datachannelId;
        done();
      });
    });

    it('return 400.', function(done) {
      request(mcs)
      .post($rest.apiRoute + '/prototypes/' + prototypeId + '/datachannels')
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        datachannelTypeId: 1,
      })
      .expect(400)
      .end(done);
    });
  });

  describe('Edit datachannel api:', function() {
    it('return 200.', function(done) {
      var datachannelDescription = 'Test datachannel123';

      request(mcs)
      .put($rest.apiRoute + '/prototypes/' + prototypeId + '/datachannels/' + datachannelId)
      .set('Authorization', 'Bearer ' + global.access_token)
      .send({
        datachannelDescription: datachannelDescription,
        format: {},
      })
      .then(function(data) {
        assert.equal(data.body.message, 'success', 'Response is not success.');
        return mcs.db.datachannels.retrievDatachannel({
          prototypeId: prototypeId,
          datachannelId: datachannelId,
          isActive: true,
        });
      })
      .then(function(data) {
        assert.equal(data[0].datachannelDescription, datachannelDescription, 'This datachannel is not equal.')
        done();
      });
    });
  });
});