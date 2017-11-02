var child = require('child_process');
var path = require('path');
var R = require('ramda');
var uuid = require('node-uuid');
var generator = require('youmeb-generator');
var fs = require('fs');

module.exports = function ($db) {

  var uploadFotaFile = function(req, res, next) {
    if (!(R.is(Object, req.files) || R.is(Array, req.files)) || R.isEmpty(req.files)) {
      return res.send(400, 'You must upload a binary file.');
    }

    if (!/\.bin$/.test(req.files.file.name)) {
      return res.send(400, "File is not invalid.");
    }

    var extname = path.extname(req.files.file.name).toLowerCase();
    var uid = uuid.v4();
    var filename = uid + extname;

    return new Promise(function(resolve, reject) {
      var mkdir = child.exec('mkdir ' + uid, { cwd: path.resolve(__dirname, '../../uploadFotaFiles')} );
      mkdir.stdout.on('data', function(data) {
        console.log(data.toString());
      });

      mkdir.stderr.on('data', function(data) {
        console.log(data.toString());
      });

      mkdir.on('exit', function(code) {
        return resolve();
      });
    })
    .then(function(){
      return new Promise(function(resolve, reject) {
        generator
        .create(path.join(__dirname, '../libs/fota'), path.join(__dirname, '../../uploadFotaFiles/' + uid))
        .createFile(
          './' + req.query.board + '.json',
          './config.json',
          { file: filename },
          function() {
            return resolve();
          }
        );
      });
    })
    .then(function() {
      return fs.readFileAsync('/' + req.files.file.path)
    })
    .then(function(data) {
      return fs.writeFileSync(path.resolve(__dirname, '../../uploadFotaFiles/' + uid, filename), data)
    })
    .then(function() {
      return new Promise(function(resolve, reject) {
        var build = child.exec('cp ../../restserver/libs/fota/' + process.platform + '-builder ./ && ./' + process.platform + '-builder ./config.json', { cwd: path.resolve(__dirname, '../../uploadFotaFiles/' + uid)});
        build.stdout.on('data', function (data) {
          console.log(data.toString());
        });

        build.stderr.on('data', function (data) {
          console.log(data.toString());
        });

        build.on('exit', function (code) {
          return resolve();
        });
      })
    })
    .then(function() {
      child.exec('cp out-' + filename + ' ../' + filename + ' && cd .. && rm -r ./' + uid, { cwd: path.resolve(__dirname, '../../uploadFotaFiles/' + uid)});
      return res.send(200, {
        data: filename,
      });
    })
    .catch(function(err) {
      return res.send(400, err);
    });
  };

  return {
    uploadFotaFile: uploadFotaFile,
  };

}
