# mcs-lite-app [![Travis][build-badge]][build] [![Github Tag][githubTag-badge]][githubTag] [![codecov](https://codecov.io/gh/MCS-Lite/mcs-lite-app/branch/master/graph/badge.svg)](https://codecov.io/gh/MCS-Lite/mcs-lite-app) [![Greenkeeper badge](https://badges.greenkeeper.io/MCS-Lite/mcs-lite-app.svg)](https://greenkeeper.io/)

> Note: Common UI and Mobile page are being developed at https://github.com/MCS-Lite/mcs-lite.

## Download Binaries
* You can always get the latest release from [GitHub Releases](https://github.com/MCS-Lite/mcs-lite-app/releases).
* Launch **mcs-lite-app** executable file to run MCS Lite platform and access the Admin Console.
* Open browser and go to http://localhost:3000 or http://$yourIPAddress:3000 for web console.

## How to Build from Source Code
### Prerequisite 

* You must have **Node.js** version >= 6 and **npm** installed on your environment.

### Steps
Go to the **mcs-lite-app** folder and use the following commands in your terminal to build the packages for supported platforms:

* Build web UI related projects.

```
// in mcs-lite-app/client folder
$ cd client && npm install && npm run build:global
$ cd ..
```

* Build nwjs package.

```
// in mcs-lite-app folder
$ npm install && npm run build:global

```

* Get the mcs-lite-app packages for each platform.

```
// in mcs-lite-app/out/mcs-lite-app folder
$ cd ./out/mcs-lite-app
```

* Launch **mcs-lite-app** executable file to run MCS Lite platform and access the Admin Console.
* Open browser and go to http://localhost:3000 or http://$yourIPAddress:3000 for web console.


## How to Setup Development Environment
### Prerequisite 

* You must have **Node.js** version >= 6 and **npm** installed on your environment.

### Steps
* Clone this repo

```
$ git clone https://github.com/MCS-Lite/mcs-lite-app.git
```

* Modify the code.
* Build and run RESTful server.

```
$ npm install && npm run watch:global
$ NODE_ENV=dev node server
```
* Build web UI related packages.

```
$ cd client && npm run watch:global
```
	
If you want to build web UI related packages with unit test, you can use

```
$ cd client && npm run test:watch
```

* Open browser and go to `http://localhost:8081` (don't use 127.0.0.1) for web console.



## Appendix
### MCS Lite Introduction
Only Traditional Chinese version is available at this moment. [http://mcs-lite-introduction.netlify.com/](http://mcs-lite-introduction.netlify.com/)

### System Architecture
![](https://dariachen1.gitbooks.io/mcs-lite-introduction/content/assets/mcs_lite_architecture.png)

### Gzip
[Express compression middleware](https://github.com/expressjs/compression#expressconnect) is enabled by default. If you want to disable it, set `GZIP_DISABLE` to `true`.

```
$ NODE_ENV=prod GZIP_DISABLE='true' node server
```


[build-badge]: https://img.shields.io/travis/MCS-Lite/mcs-lite-app/master.svg?style=flat-square
[build]: https://travis-ci.org/MCS-Lite/mcs-lite-app
[githubTag-badge]: https://img.shields.io/github/tag/MCS-Lite/mcs-lite-app.svg?style=flat-square
[githubTag]: https://github.com/MCS-Lite/mcs-lite-app/releases
