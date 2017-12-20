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

    console.log(filePath);
    var apiHost = global.wotHost;
    var apiPort = global.wotPort;

    const configs = {
      deviceId: deviceId,
      deviceKey: deviceKey,
      datachannelId: datachannelId,
      host: apiHost,
      port: apiPort
    };

    // Remind: Send the text as json format to keep whitespace / break-line / tab.
    return res.render(filePath, configs, function(err, html) {
      if (err) console.log(err);
      return res.send(JSON.stringify(html));
    });

  };

  return {
    arduinoGenerator: arduinoGenerator,
    apiHintGenerator: apiHintGenerator,
  };
}
