# mcs-lite-app [![TravisCI](https://travis-ci.org/MCS-Lite/mcs-lite-app.svg?branch=master)](https://travis-ci.org/MCS-Lite/mcs-lite-app)

[![Greenkeeper badge](https://badges.greenkeeper.io/MCS-Lite/mcs-lite-app.svg)](https://greenkeeper.io/)

> Note: Common UI and Mobile page are being developed at https://github.com/MCS-Lite/mcs-lite.

## For Usage

Please see the [releases](https://github.com/MCS-Lite/mcs-lite-app/releases)

## For Web Console Dev

### Env

* Only support Node.js version >= 6

#### Run restful server
* `NODE_ENV=dev node server`

#### Run mcs lite client

* Open another screen and go to this project root path. 
* `cd client && npm run watch:global`
* go to `http://localhost:8081` (don't use 127.0.0.1)
* If you want to build production version: `npm run build:global` (under /client path).


## For Admin Service Dev

### Env

* Only support Node.js version >= 6

#### Run admin page
* `cd admin && npm run watch:global`

#### Run mcs lite app

* Open another screen and go to this project root path. 
* `npm run watch:global`

## For Testing

```
$ npm run test:watch
```

## Gzip

[Express compression middleware](https://github.com/expressjs/compression#expressconnect) is enabled by default. If you want to disable it, set `GZIP_DISABLE` to `true`.

```
$ NODE_ENV=prod GZIP_DISABLE='true' node server
```
