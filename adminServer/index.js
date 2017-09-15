var express = require('express');
var path = require('path');
var OAuthServer = require('oauth2-server');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var R = require('ramda');
var $admin = require('../configs/admin');
var app = express();
var oauth = require('./oauth');
var routers = require('./routers/index');
var handleRouters = require('./libs/index').handleRouter;
var connectToDB = require('./libs/index').connectToDB;
var dbConfig = require('../configs/db');
var connectDB = connectToDB(dbConfig).init();
var Oauth = new oauth(connectDB);

global.oauthHost = 'http://' + $admin.host + ':' + $admin.port;
global.host = $admin.host + ':' + $admin.port + $admin.apiRoute;

app.oauth = new OAuthServer({
  model: Oauth,
  grants: ['password', 'refresh_token'],
  debug: true,
  accessTokenLifetime: $admin.ACCESS_TOKEN_EXP * 60,
  refreshTokenLifetime: $admin.REFRESH_TOKEN_EXP * 60
});

app.engine('html', require('ejs').renderFile);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, deviceKey");
  next();
});

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10,
  extended: true,
}));
app.use(cookieParser());

const adminPathname = '../node_modules/mcs-lite-admin-web/build';
app.use('/admin/static', express.static(path.resolve(__dirname, adminPathname + '/static')));
app.use('/admin/images', express.static(path.resolve(__dirname, adminPathname + '/images')));
app.use('/admin/service-worker.js', express.static(path.resolve(__dirname, adminPathname + '/service-worker.js')));

app.all('/oauth/token', app.oauth.grant());
app.db = connectDB;

handleRouters(app, new routers(connectDB, app, $admin));
app.use(app.oauth.errorHandler());

module.exports = app;