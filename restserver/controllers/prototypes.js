module.exports = function ($db) {

  var retrievePrototypeDetail = function(req, res, next) {
    res.send('123123');
  };

  var retrievePrototype = function(req, res, next) {
    res.send('123123');
  };

  var addNewPrototype = function(req, res, next) {
    res.send('123123');
  };

  var addDataChannel = function(req, res, next) {
    res.send('123123');
  };

  var editDataChannel = function(req, res, next) {
    res.send('123123');
  };

  return {
    retrievePrototypeDetail: retrievePrototypeDetail,
    retrievePrototype: retrievePrototype,
    addNewPrototype: addNewPrototype,
    addDataChannel: addDataChannel,
    editDataChannel: editDataChannel,
  };

};