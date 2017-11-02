module.exports = function($db) {

  var unittypes = $db.unittypes;

  var addNewUnitTypes = function(req, res, next) {
    var userId = req.user.userId;
    var name = req.body.name;
    var symbol = req.body.symbol;

    var field = {
      createUserId: userId,
      name: name,
      symbol: symbol,
      isTemplate: false,
      isActive: true,
    };

    return unittypes.addNewUnitTypes(field)
    .then(function(data) {
      return res.send(200, { message: 'success' });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  var retrieveUnitTypes = function(req, res) {
    var userId = req.user.userId;

    return unittypes.retrieveUnitTypes({ createUserId: userId })
      .then(function(data) {
        return res.send(200, { data });
      });
  };

  return {
    retrieveUnitTypes: retrieveUnitTypes,
    addNewUnitTypes: addNewUnitTypes,
  };
}
