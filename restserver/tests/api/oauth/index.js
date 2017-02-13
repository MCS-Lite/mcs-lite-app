var request = require('supertest-as-promised');
var faker = require('faker');
var assert = require('chai').assert;
// var mcs = require('../../../index');
// mcs.listen(3000);

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123213';

var access_token;
var refresh_token;

/* oauth rule setting */
var oauth = require('../../../../configs/oauth');
var clientId = oauth.webClient.clientId;
var clientSecret = oauth.webClient.secret;
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');

require('../../bootstrap.js');

describe('Oauth API:', function() {


  before(function(done) {
    request(mcs)
    .post($rest.apiRoute + '/users/regist')
    .send({
      userName: userName,
      email: email,
      password: password,
    })
    .expect(200)
    .end(done);
  });

  describe('test login api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .post('/oauth/token')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + basic_token)
      .send({
        email: email,
        password: password,
        grant_type: 'password'
      })
      .then(function(data) {
        access_token = data.body.access_token;
        refresh_token = data.body.refresh_token;
        assert.equal(data.body.token_type, 'bearer', 'token_type is not bearer.')
        done();
      });
    });
  });

  describe('check access_token api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .get('/test')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .end(done);
    });

    it('return 401.', function(done) {
      request(mcs)
      .get('/test')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer 1' + access_token)
      .then(function(data) {
        assert.equal(data.body.error_description , 'The access token provided is invalid.', 'Error response is not correct!')
        done();
      });
    });
  });

  describe('check access_token api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .post('/oauth/token')
      .set('Authorization', 'Basic ' + basic_token)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      })
      .expect(200)
      .end(done);
    });
  });

});
