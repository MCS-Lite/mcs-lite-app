#!/bin/bash

set -e

rm -rf ./build
rm -rf ./appBuild

rm -rf ./out
mkdir build
mkdir -p appBuild/client/app
mkdir -p appBuild/client/apiHints

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


cp -R ./client/app/build/ ./appBuild/client/app/build
cp -R ./client/apiHints/ ./appBuild/client/apiHints

# cp -R ./restserver/ ./appBuild/restserver
./node_modules/.bin/babel ./restserver/ -d ./appBuild/restserver --copy-files

# cp -R ./adminServer/ ./appBuild/adminServer
./node_modules/.bin/babel ./adminServer/ -d ./appBuild/adminServer --copy-files

# cp -R ./wotserver/ ./appBuild/wotserver
./node_modules/.bin/babel ./wotserver/ -d ./appBuild/wotserver --copy-files

./node_modules/.bin/babel ./nedb/ -d ./appBuild/nedb --copy-files
./node_modules/.bin/babel ./server.js -d ./appBuild/

cp -R ./configs/ ./appBuild/defaultConfigs
cp -R ./configs/ ./appBuild/configs
cp -R ./node_modules/ ./appBuild/node_modules
cp -R package.json ./appBuild/package.json
cp -R ./dbTemplates/ ./appBuild/db
cp -R ./uploadImages/ ./appBuild/uploadImages

mkdir -p appBuild/uploadFotaFiles

cd appBuild
npm remove nw-builder supertest supertest-as-promised --save-dev
rm -rf ./restserver/tests
rm -rf ./adminServer/tests
rm -rf ./wotServer/tests
rm -rf ./nedb/test

cd ..

cp -R index.html ./build/index.html
./node_modules/.bin/babel index.js -d ./build/
cp -R package.json ./build/package.json

mkdir out

nwbuild -p win32,win64,osx64,linux32,linux64 -v 0.20.3 ./build -o ./out

mkdir -p ./out/mcs-lite-app/win64/mcs-lite-app
mkdir -p ./out/mcs-lite-app/win32/mcs-lite-app
mkdir -p ./out/mcs-lite-app/osx64/mcs-lite-app

cp -R ./appBuild/. ./out/mcs-lite-app/win64/mcs-lite-app
winresourcer --operation=Update --exeFile=./out/mcs-lite-app/win64/mcs-lite-app.exe --resourceType=Icongroup --resourceName=IDR_MAINFRAME --lang=1033 --resourceFile=./icon.ico

cp -R ./appBuild/. ./out/mcs-lite-app/win32/mcs-lite-app
winresourcer --operation=Update --exeFile=./out/mcs-lite-app/win32/mcs-lite-app.exe --resourceType=Icongroup --resourceName=IDR_MAINFRAME --lang=1033 --resourceFile=./icon.ico

cp -R ./appBuild/. ./out/mcs-lite-app/osx64/mcs-lite-app
cp -R ./icon.icns ./out/mcs-lite-app/osx64/mcs-lite-app.app/Contents/Resources/app.icns
cp -R ./icon.icns ./out/mcs-lite-app/osx64/mcs-lite-app.app/Contents/Resources/document.icns

cp -R ./nodeBinary/mac/node ./out/mcs-lite-app/osx64/
cp -R ./nodeBinary/win32/node.exe ./out/mcs-lite-app/win32/
cp -R ./nodeBinary/win64/node.exe ./out/mcs-lite-app/win64/

cp -R ./setup ./out/mcs-lite-app/osx64/ && chmod +x ./out/mcs-lite-app/osx64/setup
