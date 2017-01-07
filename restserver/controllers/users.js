module.exports = function ($db) {

  var registUser = function(req, res, next) {
    return $db.users.addNewUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    })
    .then(function(data) {
      return res.send(200, 'success');
    })
    .catch(function(err) {
      return res.send(400, err);
    })
  };

  var retrieveUserList = function(req, res, next) {
    var userId = req.user.userId;
    res.send('123123');
  };

  return {
    registUser: registUser,
    retrieveUserList: retrieveUserList,
    // login: login,
  };
};