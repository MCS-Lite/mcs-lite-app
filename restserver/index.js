var express = require('express');
var OAuthServer = require('oauth2-server');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var $oauth = require('../configs/oauth');
var $rest = require('../configs/rest');
var app = express();
var oauth = require('./oauth');
var routers = require('./routers/index');
var handleRouters = require('./libs/index').handleRouter;
var connectToDB = require('./libs/index').connectToDB;
var dbConfig = require('../configs/db');

var connectDB = connectToDB(dbConfig).init();
var Oauth = new oauth(connectDB);

global.oauthHost = 'http://' + $oauth.host + ':' + $oauth.port;
console.log(oauthHost);
global.host = $rest.host + ':' + $rest.port + $rest.apiRoute;

app.oauth = new OAuthServer({
  model: Oauth,
  grants: ['password', 'refresh_token'],
  debug: true,
  accessTokenLifetime: $oauth.ACCESS_TOKEN_EXP * 60,
  refreshTokenLifetime: $oauth.REFRESH_TOKEN_EXP * 60
});

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname.replace(__dirname.split('/')[__dirname.split('/').length - 1], '') + 'client');
app.use('/assets', express.static(__dirname.replace(__dirname.split('/')[__dirname.split('/').length - 1], '') + 'client/app/build/assets'));

app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('/oauth/token', app.oauth.grant());
app.db = connectDB;
handleRouters(app, new routers(connectDB, app, $rest));
app.use(app.oauth.errorHandler());

module.exports = app;
