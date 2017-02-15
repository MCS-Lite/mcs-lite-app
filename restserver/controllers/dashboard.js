module.exports = function ($db) {
  var prototypes = $db.prototypes;

  var dashboard = function(req, res, next) {
    var prototypeData = {};
    var userId = req.user.userId;

    return prototypes.retriveAllTemplatesPrototypes()
    .then(function(data) {
      prototypeData.templates = data;
      return prototypes.retriveUserPrototypes({
        createdUserId: userId,
        isActive: true,
      });
    })
    .then(function(data) {
      prototypeData.userPrototypes = data;
      return res.send(200, prototypeData);
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    dashboard: dashboard,
  };
}