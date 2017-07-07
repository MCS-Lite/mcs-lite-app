#!/bin/bash

set -e

rm -rf ./build
rm -rf ./appBuild

rm -rf ./out
mkdir build
mkdir appBuild

cd appBuild && mkdir client && cd client && mkdir app
cd ../..

cp -R ./client/app/build/ ./appBuild/client/app/build
cp -R ./restserver/ ./appBuild/restserver
cp -R ./wotserver/ ./appBuild/wotserver
cp -R ./configs/ ./appBuild/configs
cp -R ./nedb/ ./appBuild/nedb
cp -R ./node_modules/ ./appBuild/node_modules
cp -R ./regist.js ./appBuild/server.js
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

mkdir out_win
nwbuild -p win32,win64 -v 0.20.1 ./build -o ./out_win

cd ./out_win/mcs-lite-app/win64
mkdir mcs-lite-app
cd ../../..


cp -R ./appBuild/. ./out_win/mcs-lite-app/win64/mcs-lite-app
winresourcer --operation=Update --exeFile=./out_win/mcs-lite-app/win64/mcs-lite-app.exe --resourceType=Icongroup --resourceName=IDR_MAINFRAME --lang=1033 --resourceFile=./icon.ico
cp -R ./appBuild/. ./out_win/mcs-lite-app/win32/mcs-lite-app
winresourcer --operation=Update --exeFile=./out_win/mcs-lite-app/win32/mcs-lite-app.exe --resourceType=Icongroup --resourceName=IDR_MAINFRAME --lang=1033 --resourceFile=./icon.ico

