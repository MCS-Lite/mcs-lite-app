var users = require('./nedb/users/index');
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


users
.retrieveOneUser({ userId: 'Bwwwwwww' })
.then(function(data) {
  console.log(data);
})
.catch(function(err) {
  console.log(err);
});