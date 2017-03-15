var fileExists = require('file-exists');
var path = require('path');

module.exports = function ($db) {
  var arduinoGenerator = function(req, res, next) {

  };

  var apiHintGenerator = function(req, res, next) {
    var deviceId = req.params.deviceId;
    var deviceKey = req.query.deviceKey;
    var datachannelTypeId = req.params.datachannelTypeId;
    var typeId = req.params.typeId; // 1, 2
    var method = req.params.method; // retrieve, upload
    var content = req.params.content;
    var datachannelId = req.params.datachannelId;

    const templatePath = datachannelTypeId + '/' + typeId + '/' + method + '/';
    const filePath = path.resolve(__dirname, '../../client/apiHints/' + templatePath, content + '.ejs');

    if (!fileExists.sync(filePath)) {
      return res.send(400, { message: 'Cannot find this file.'});
    }

    var apiHost = global.host.split(':')[0];
    var apiPort = global.host.split(':')[1].split('/')[0];

    return res.render(filePath, {
      deviceId: deviceId,
      deviceKey: deviceKey,
      datachannelId: datachannelId,
      host: apiHost,
      port: apiPort
    });
  };

  return {
    arduinoGenerator: arduinoGenerator,
    apiHintGenerator: apiHintGenerator,
  };
}