var R = require('ramda');
var path = require('path');
var uuid = require('node-uuid');
var isImage = require('is-image');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function ($db) {
  var users = $db.users;

  var uploadImage = function(req, res, next) {
    var typeArray = ['prototype', 'device', 'profile'];

    if (!(R.is(Object, req.files) || R.is(Array, req.files)) || R.isEmpty(req.files)) {
      return res.send(400, 'You must upload a image file.');
    }

    if (!req.query.type) {
      return res.send(400, 'You must input a type in body.');
    }

    if (!isImage(req.files.file.name)) {
      return res.send(502);
    }

    if (R.indexOf(req.query.type, typeArray) === -1) {
      return res.send(503);
    }

    var extname = path.extname(req.files.file.name).toLowerCase();
    var filename = req.query.type + '/' + uuid.v4() + extname;

    return fs.readFileAsync('/' + req.files.file.path)
    .then(function(data) {
      return fs.writeFileSync(path.resolve(__dirname, '../../uploadImages/', filename), data)
    })
    .then(function() {
      if (req.query.type === 'profile') {
        var userId = req.user.userId;

        return users.editUser({ userId: userId }, { userImage: filename })
          .then(function() {
            return res.send(200, {
              data: filename,
            });
          })
      } else {
        return res.send(200, {
          data: filename,
        });
      }
    })
    .catch(function(err) {
      console.log(err);
      return res.send(400, err);
    });
  };

  return {
    uploadImage: uploadImage,
  };
};
