# MCS Lite Application
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
* You must have **nwjs** installed on your environment. You can simply run the **install.sh** attached in the source code.

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

## How to Setup MySQL
### Prerequisite 

*   docker

### Steps

Pull the official mysql image from Dockerhub:

```cmd
$ docker pull mysql:latest
$ docker run \
  --name mcslite-mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=mcslite \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=root \
  -d mysql:latest

$ docker logs mcslite-mysql
$ docker exec mcslite-mysql mysql --version
# mysql  Ver 14.14 Distrib 5.7.19, for Linux (x86_64) using  EditLine wrapper
```


To connect with mcs-lite-app, please modify the configuration file of MySQL `configs/db.json`:

```json
// configs/db.json

{
  "db": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "mcslite",
  "dialect": "mysql",
  "logging": true
}
```

Run the migration script to update tables and schemas of database:

```cmd
$ node migration.js
```
