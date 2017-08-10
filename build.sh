#!/bin/bash

set -e

rm -rf ./build
rm -rf ./appBuild

rm -rf ./out
mkdir build
mkdir appBuild

cd appBuild && mkdir client && cd client && mkdir app && mkdir apiHints
cd ../..

cp -R ./client/app/build/ ./appBuild/client/app/build
cp -R ./client/apiHints/ ./appBuild/client/apiHints
cp -R ./restserver/ ./appBuild/restserver
cp -R ./adminServer/ ./appBuild/adminServer
cp -R ./wotserver/ ./appBuild/wotserver
cp -R ./configs/ ./appBuild/defaultConfigs
cp -R ./configs/ ./appBuild/configs
cp -R ./nedb/ ./appBuild/nedb
cp -R ./node_modules/ ./appBuild/node_modules
cp -R ./server.js ./appBuild/server.js
cp -R package.json ./appBuild/package.json
cp -R ./dbTemplates/ ./appBuild/db
cp -R ./uploadImages/ ./appBuild/uploadImages

cd ./appBuild && mkdir uploadFotaFiles && cd ..

cd appBuild
npm remove nw-builder --save
npm remove supertest --save
npm remove supertest-as-promised --save

rm -rf ./restserver/tests
rm -rf ./nedb/test

cd ..

cp -R index.html ./build/index.html
cp -R index.js ./build/index.js
cp -R package.json ./build/package.json

mkdir out
nwbuild -p win32,win64,osx64 -v 0.20.1 ./build -o ./out

cd ./out/mcs-lite-app/win64
mkdir mcs-lite-app

cd ../../..
cd ./out/mcs-lite-app/osx64
mkdir mcs-lite-app

cd ../../..
cp -R ./appBuild/. ./out/mcs-lite-app/win64/mcs-lite-app
winresourcer --operation=Update --exeFile=./out/mcs-lite-app/win64/mcs-lite-app.exe --resourceType=Icongroup --resourceName=IDR_MAINFRAME --lang=1033 --resourceFile=./icon.ico
cp -R ./appBuild/. ./out/mcs-lite-app/win32/mcs-lite-app
winresourcer --operation=Update --exeFile=./out/mcs-lite-app/win32/mcs-lite-app.exe --resourceType=Icongroup --resourceName=IDR_MAINFRAME --lang=1033 --resourceFile=./icon.ico
cp -R ./appBuild/. ./out/mcs-lite-app/osx64/mcs-lite-app
cp -R ./icon.icns ./out/mcs-lite-app/osx64/mcs-lite-app.app/Contents/Resources/app.icns
cp -R ./icon.icns ./out/mcs-lite-app/osx64/mcs-lite-app.app/Contents/Resources/document.icns

cd ./out/mcs-lite-app/osx64 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/mac/node && chmod +x ./node && cd -
cd ./out/mcs-lite-app/win32 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/win32/node.exe && cd -
cd ./out/mcs-lite-app/win64 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/win64/node.exe && cd -

cp -R ./setup ./out/mcs-lite-app/osx64/ && chmod +x ./out/mcs-lite-app/osx64/setup
