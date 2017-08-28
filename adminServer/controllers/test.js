module.exports = function ($db) {

  var test = function(req, res, next) {
    res.send(200, "123132");
  };

  return {
    test: test,
  };

};
