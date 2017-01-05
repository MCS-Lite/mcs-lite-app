module.exports = function ($db) {

  var retrieveDevice = function (req, res, next) {
    console.log($db);
    console.log(123132);
    res.send('123123')
  };

  var retrieveDeviceDetail = function(req, res, next) {

  };

  var addNewDevice = function(req, res, next) {

  };

  var editNewDevice = function(req, res, next) {

  };

  return {
    retrieveDevice: retrieveDevice,
    retrieveDeviceDetail: retrieveDeviceDetail,
    addNewDevice: addNewDevice,
    editNewDevice: editNewDevice,
  };

};