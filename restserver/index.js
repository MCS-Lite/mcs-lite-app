var express = require('express');
var path = require('path');
var OAuthServer = require('oauth2-server');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var R = require('ramda');
var $oauth = require('../configs/oauth');
var $rest = require('../configs/rest');
var $wot = require('../configs/wot');
var app = express();
var oauth = require('./oauth');
var routers = require('./routers/index');
var handleRouters = require('./libs/index').handleRouter;
var connectToDB = require('./libs/index').connectToDB;
var dbConfig = require('../configs/db');
var os = require('os');
var compression = require('compression');
var socketPort = require('../configs/wot.json').port;

var connectDB = connectToDB(dbConfig).init();
var Oauth = new oauth(connectDB);

global.oauthHost = 'http://' + $oauth.host + ':' + $oauth.port;
global.host = $rest.host + ':' + $rest.port + $rest.apiRoute;
global.wotHost = 'ws://' + $wot.host + ':' + $wot.port;

app.oauth = new OAuthServer({
  model: Oauth,
  grants: ['password', 'refresh_token'],
  debug: true,
  accessTokenLifetime: $oauth.ACCESS_TOKEN_EXP * 60,
  refreshTokenLifetime: $oauth.REFRESH_TOKEN_EXP * 60
});

app.engine('html', require('ejs').renderFile);
app.set('views', path.resolve(__dirname, '../client'));


/**
 * [Gzip] compress all responses
 * https://github.com/expressjs/compression#expressconnect
 *
 * @author Michael Hsu
 */
if (process.env.GZIP_DISABLE !== 'true') {
  app.use(compression())
}

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

app.use('/images', express.static(path.resolve(__dirname, '../uploadImages')));
app.use('/fota', express.static(path.resolve(__dirname, '../uploadFotaFiles')));

/**
 * Serving mobile website via npm.
 * $npm i mcs-lite-mobile-web --save
 * @author Michael Hsu
 */
const mobilePathname = '../node_modules/mcs-lite-mobile-web/build';
const replacePort = R.memoize(function(string){
  return R.replace('__SOCKET_PORT_FROM_SERVER__', socketPort)(string)
});
app.use('/mobile', express.static(path.resolve(__dirname, mobilePathname)));
app.get('/mobile/*', function (req, res) {
  res.render(path.resolve(__dirname, mobilePathname, 'index.html'), function(err, html) {
    res.send(replacePort(html));
  });
});

/**
 * Serving GitBook website via npm.
 * $npm i mcs-lite-introduction --save
 * @author Michael Hsu
 */
const docsPathname = '../node_modules/mcs-lite-introduction/_book';
app.use('/docs', express.static(path.resolve(__dirname, docsPathname)));
app.get('/docs/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, docsPathname, 'index.html'));
});

app.use('/assets', express.static(path.resolve(__dirname, '../client/app/build/assets')));

app.all('/oauth/token', app.oauth.grant());
app.db = connectDB;
handleRouters(app, new routers(connectDB, app, $rest, $oauth, $wot));
app.use(app.oauth.errorHandler());

var interfaces = os.networkInterfaces();
var addresses = '';
var addressesList = '';
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses +=  '\'' + address.address + ':' + $rest.port + '\'\n';
        }
    }
}

console.log('+-+-+-+ +-+-+-+-+');
console.log(' M C S   L I T E ');
console.log('+-+-+-+ +-+-+-+-+');
console.log();
console.log('MCS Lite server IP: \n\n' + addresses);

module.exports = app;
