var express = require('express');
var OAuthServer = require('oauth2-server');
var bodyParser = require('body-parser');
var configs = require('../configs/oauth');
var app = express();
var oauth = require('./oauth');
var routers = require('./routers/index');
var handleRouters = require('./libs/index').handleRouter;
var connectToDB = require('./libs/index').connectToDB;
var dbConfig = require('../configs/db');

var connectDB = connectToDB(dbConfig).init();
var Oauth = new oauth(connectDB);

app.oauth = new OAuthServer({
  model: Oauth,
  grants: ['password', 'refresh_token'],
  debug: true,
  accessTokenLifetime: configs.ACCESS_TOKEN_EXP * 60,
  refreshTokenLifetime: configs.REFRESH_TOKEN_EXP * 60
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/oauth/token', app.oauth.grant());
app.db = connectDB;
handleRouters(app, new routers(connectDB, app));
app.use(app.oauth.errorHandler());

module.exports = app;
