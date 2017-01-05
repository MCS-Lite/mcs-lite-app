module.exports = function ($db) {

  var registUser = function(req, res, next) {
    res.send('123123');
  };

  var retrieveUserList = function(req, res, next) {
    res.send('123123');
  };

  return {
    registUser: registUser,
    retrieveUserList: retrieveUserList,
  };
};