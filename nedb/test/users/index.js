var assert = require('chai').assert;
var users = require('../../index').init().users;
var faker = require('faker');
var email = faker.internet.email();

describe('NeDB connector: Users', function() {

  describe('addNewUser api', function() {
    it('Regist a new users', function(done) {
      users.addNewUser({
        userName: faker.name.findName(),
        email: email,
        password: '123123213',
        isAdmin: false,
      })
      .then(function(data) {done();})
      .catch(done);
    });
  });

  describe('retrieveUserList api', function() {
    it('Retrieve all user list.', function(done) {
      users
      .retrieveUserList()
      .then(function(data) {done();})
      .catch(done);
    });
  });

  describe('retrieveOneUser api', function() {
    it('Retrieve one user.', function(done) {
      users
      .retrieveOneUser({ email: email })
      .then(function(data) {
        assert.isObject(data[0], 'Got this user!')
        done();
      })
      .catch(done);
    });
  });

  describe('editUser api', function() {
    it('editUser one user.', function(done) {
      users
      .editUser({ email: email }, { userName: 'iamblue' })
      .then(function(data) {
        assert.equal(data.message, 'success', 'edit success.');
      })
      .then(function() {
        return users.retrieveOneUser({ email: email })
      })
      .then(function(data) {
        assert.equal(data[0].userName, 'iamblue', 'Got this user!');
        done();
      })
      .catch(done);
    });
  });

});