module.exports = function ($db) {

  var users = $db.users;

  var registUser = function(req, res, next) {
    return users.addNewUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    })
    .then(function(data) {
      return res.send(200, 'success');
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveUserList = function(req, res, next) {
    var userId = req.user.userId;
    return users.checkIsAdmin(userId)
    .then(function() {
      return users.retrieveUserList()
    })
    .then(function(data) {
      return res.send(200, data);
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    registUser: registUser,
    retrieveUserList: retrieveUserList,
    // login: login,
  };
};