var _ = require('lodash');
var path = require('path');
var uuid = require('node-uuid');
var isImage = require('is-image');

module.exports = function ($db) {
  var uploadImage = function(req, res, next) {
    var typeArray = ['prototype', 'device'];

    if (_.isEmpty(req.files)) {
      return res.send(400, 'You must upload a image file.');
    }

    if (!req.query.type) {
      return res.send(400, 'You must input a type in body.');
    }

    if (!isImage(req.files.file.name)) {
      return res.send(502);
    }

    if (_.indexOf(typeArray, req.query.type) === -1) {
      return res.send(503);
    }

    var extname = path.extname(req.files.file.name).toLowerCase();
    var filename = req.query.type + '/' + uuid.v4() + extname;

    return res.send(200, {
      results: filename,
    });
  };

  return {
    uploadImage: uploadImage,
  };
};