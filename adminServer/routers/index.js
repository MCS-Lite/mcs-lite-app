var connectMultiparty = require('connect-multiparty');

var $oauth = require('../../configs/oauth');

var webClientId = $oauth.webClient.clientId;
var webClientSecret = $oauth.webClient.secret;
var webBasicToken = new Buffer(webClientId + ':' + webClientSecret).toString('base64');

var mobileClientId = $oauth.mobileClient.clientId;
var mobileClientSecret = $oauth.mobileClient.secret;
var mobileBasicToken = new Buffer(mobileClientId + ':' + mobileClientSecret).toString('base64');

var bodyParser = require('body-parser');

module.exports = function($db, $app, $rest, $oauth, $wot) {

  const parseBasicToken = function(req, res, next) {
    if (/mobile/.test(req.route.path)) {
      req.basicToken = mobileBasicToken;
      req.clientAppInfo = {
        isMobile: true,
        redirect: $oauth.mobileClient.redirect,
      };
    } else {
      req.basicToken = webBasicToken;
      req.clientAppInfo = {
        isMobile: false,
        redirect: $oauth.webClient.redirect,
      };
    }
    next();
  };

  this.test = {
    path: '/',
    methods: ['get'],
    handler: function(req, res, next) {
      res.send(200, { aaa: '123' });
    },
  };

};
