# mcs-lite-app

> Note: Common UI and Mobile page are being developed at https://github.com/evenchange4/mcs-lite.

-   Try desktop online - https://mcs-lite-server-iamblue.c9users.io/
-   Try mobile online - https://mcs-lite-server-iamblue.c9users.io/mobile
-   Try common UI online - http://mcs-lite-ui.netlify.com/
-   [WIP] MCS Lite Resources -  https://dariachen1.gitbooks.io/mcs-lite-introduction/content/

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
