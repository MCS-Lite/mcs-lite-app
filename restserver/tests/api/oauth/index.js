var request = require('supertest-as-promised');
var faker = require('faker');
var mcs = require('../../../index');

/* faker user account */
var userName = faker.name.findName();
var email = faker.internet.email();
var password = '123123123';

mcs.db.users.addNewUser({
  userName: userName,
  email: email,
  password: '123123213',
});

/* oauth rule setting */
var oauth = require('../../../../configs/oauth');
var clientId;
var clientSecret;
Object.keys(oauth.clients).forEach(function(key) { clientId = key; clientSecret = oauth.clients[key].secret });
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');

describe('Oauth API:', function() {
  describe('test login api:', function() {
    it('return 200.', function(done) {
      request(mcs)
      .post('/oauth/token')
      .set('Authorization', basic_token)
      .send({
        email: email,
        password: password,
        grant_type: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
    });
  });
});
