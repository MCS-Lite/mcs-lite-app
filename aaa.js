var users = require('./nedb/users/index');
var faker = require('faker');
var userName = faker.name.findName();
// var email = 'Veronica15@hotmail.com';
var email = faker.internet.email();
var password = '123123213';
console.log(email)
console.log(password)
// users.addNewUser({
//   userId: '1231233',
//   userName: 'qweqweqwe',
//   email: 'tonyone0902@gmail.com',
//   password: 'qweqeqwewqe',
// }).then(function(err, docs) {
//   console.log(err);
//   console.log(docs);
// }).catch(function(err) {
//   console.log(err);
// })


// users
// .retrieveOneUser({ userId: 'Bwwwwwww' })
// .then(function(data) {
//   console.log(data);
// })
// .catch(function(err) {
//   console.log(err);
// });

      // .set('Content-Type', 'application/x-www-form-urlencoded')

var basic_token = new Buffer('1000000000000000001' + ':' + 'mcs_lite_app_secret').toString('base64');


var request = require('supertest-as-promised');

// mcs.db.users.addNewUser({
//       userName: userName,
//       email: email,
//       password: password,
//     });

// request('http://127.0.0.1:3000')
// .post('/oauth/token')
// .set('Content-Type', 'application/x-www-form-urlencoded')
// .set('Authorization', 'Basic ' + basic_token)
// .send({
//   email: email,
//   password: password,
//   grant_type: 'password'
// })
// .then(function(data) {
//   console.log(data);
// })