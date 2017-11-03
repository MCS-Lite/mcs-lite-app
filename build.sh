#!/bin/bash

set -e

rm -rf ./build
rm -rf ./appBuild

rm -rf ./out
mkdir build
mkdir appBuild

if [ ! -f nodeBinary/mac/node ]; then
	mkdir -p nodeBinary/mac && cd nodeBinary/mac && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/mac/node && chmod +x ./node && cd -
else
	echo "node for mac exists."
fi

if [ ! -f nodeBinary/win32/node.exe ]; then
	mkdir -p nodeBinary/win32 && cd nodeBinary/win32 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/win32/node.exe && cd -
else
	echo "node for win32 exists."
fi

if [ ! -f nodeBinary/win64/node.exe ]; then
	mkdir -p nodeBinary/win64 && cd nodeBinary/win64 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/win64/node.exe && cd -
else
	echo "node for win64 exists."
fi

cd appBuild && mkdir client && cd client && mkdir app
cd ../..

cp -R ./client/app/build/ ./appBuild/client/app/build
cp -R ./client/apiHints/ ./appBuild/client/apiHints
cp -R ./restserver/ ./appBuild/restserver
cp -R ./adminServer/ ./appBuild/adminServer
cp -R ./wotserver/ ./appBuild/wotserver
cp -R ./configs/ ./appBuild/defaultConfigs
cp -R ./configs/ ./appBuild/configs
cp -R ./nedb/ ./appBuild/nedb
cp -R ./mysql/ ./appBuild/mysql
cp -R ./server.js ./appBuild/server.js
cp -R ./migration.js ./appBuild/migration.js
cp -R package.json ./appBuild/package.json
cp -R ./dbTemplates/ ./appBuild/db
cp -R ./uploadImages/ ./appBuild/uploadImages

cd ./appBuild && mkdir uploadFotaFiles && cd ..

cd appBuild
rm -rf ./restserver/tests
rm -rf ./nedb/test
rm -rf ./mysql/test

npm install --production

cd ..

cp -R index.html ./build/index.html
cp -R index.js ./build/index.js
cp -R package.json ./build/package.json

mkdir out

node ./nwBuild.js

cd ./out/mcs-lite-app/win64
mkdir mcs-lite-app

cd ../../..
cd ./out/mcs-lite-app/osx64
mkdir mcs-lite-app

cd ../../..
cp -R ./appBuild/. ./out/mcs-lite-app/win64/mcs-lite-app
cp -R ./appBuild/. ./out/mcs-lite-app/win32/mcs-lite-app
cp -R ./appBuild/. ./out/mcs-lite-app/osx64/mcs-lite-app

cp -R ./nodeBinary/mac/node ./out/mcs-lite-app/osx64/
cp -R ./nodeBinary/win32/node.exe ./out/mcs-lite-app/win32/
cp -R ./nodeBinary/win64/node.exe ./out/mcs-lite-app/win64/

cp -R ./setup ./out/mcs-lite-app/osx64/ && chmod +x ./out/mcs-lite-app/osx64/setup
