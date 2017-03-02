module.exports = function($db) {

  var unittypes = $db.unittypes;

  var addNewUnitTypes = function(req, res, next) {
    // unittypes
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

  var retrieveUnitTypes = function(req, res, next) {
    var userId = req.user.userId;
    var unitTypeData;
    return unittypes.retrieveUnitTypes({
      isTemplate: true,
    })
    .then(function(data) {
      unitTypeData = data;
      console.log();
      return unittypes.retrieveUnitTypes({
        createUserId: userId
      });
    })
    .then(function(data) {
      console.log(unitTypeData);
      unitTypeData = unitTypeData.concat(data)
      return res.send(200, { data: unitTypeData });
    })
  };

  return {
    retrieveUnitTypes: retrieveUnitTypes,
    addNewUnitTypes: addNewUnitTypes,
  };
}
