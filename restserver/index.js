var express = require('express');
var app = express();
var routers = require('./routers/index');
var handleRouters = require('./libs/index').handleRouter;
var connectToDB = require('./libs/index').connectToDB;
var dbConfig = require('../configs/db');
var Routers = new routers(connectToDB(dbConfig).init());

handleRouters(app, Routers);

module.exports = app;
