# mcs-lite-app

> Note: Common UI and Mobile page are being developed at https://github.com/evenchange4/mcs-lite.

-   Try desktop online - https://mcs-lite-server-iamblue.c9users.io/
-   Try mobile online - https://mcs-lite-server-iamblue.c9users.io/mobile
-   Try common UI online - http://mcs-lite-ui.netlify.com/

## For Usage
* Only support Node.js version >= 6

### Windows

### Mac

### Linux or other Server
* `node server`

## For Dev

### Env

* Only support Node.js version >= 6

#### Run restful server
* `NODE_ENV=dev node server`

#### Run mcs lite client
* `cd client && npm run watch:global`
* go to `http://localhost:8081` (don't use 127.0.0.1)
* If you want to build production version: `npm run build:global` (under /client path).
