var request = require('supertest-as-promised');

var oauth = require('../../../../configs/oauth');
var clientId = oauth.webClient.clientId;
var clientSecret = oauth.webClient.secret;
var basic_token = new Buffer(clientId + ':' + clientSecret).toString('base64');

module.exports = function(userName, email, password, isAdmin, mcs, done) {
  return request(mcs)
  .post($rest.apiRoute + '/users/regist')
  .send({
    userName: userName,
    email: email,
    password: password,
  })
  .then(function() {
    return mcs.db.users.changeUserToAdmin(email, isAdmin)
  })
  .then(function() {
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
      global.access_token = data.body.access_token;
      global.refresh_token = data.body.refresh_token;
      done();
    });
  });
}
