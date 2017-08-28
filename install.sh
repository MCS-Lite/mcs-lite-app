#!/usr/bin/env bash

cp -R ./configs/ ./defaultConfigs 
mkdir uploadImages && cd uploadImages && mkdir device && mkdir profile && mkdir prototype && cd ..

mkdir uploadFotaFiles

mkdir node && cd node && mkdir win32 && mkdir win64 && mkdir osx64

cd ./osx64 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/mac/node && chmod +x ./node && cd -
cd ./win32 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/win32/node.exe && cd -
cd ./win64 && wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/mcs-lite-app/nodejsv6.11.0/win64/node.exe && cd -

cd ..

rm -rf ./nw.js-sdk
mkdir nw.js-sdk && cd nw.js-sdk

if [ "$(uname)" == "Darwin" ]; then
wget https://dl.nwjs.io/v0.20.3/nwjs-sdk-v0.20.3-osx-x64.zip
unzip ./nwjs-sdk-v0.20.3-osx-x64.zip
cp -R ./nwjs-sdk-v0.20.3-osx-x64/* ./

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
wget https://dl.nwjs.io/v0.20.3/nwjs-sdk-v0.20.3-linux-x64.tar.gz
gzip -d ./nwjs-sdk-v0.20.3-linux-x64.tar.gz
tar -xvf ./nwjs-sdk-v0.20.3-linux-x64.tar
cp -R ./nwjs-sdk-v0.20.3-linux-x64/* ./

elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
wget https://dl.nwjs.io/v0.20.3/nwjs-sdk-v0.20.3-win-x64.zip
unzip ./nwjs-sdk-v0.20.3-win-x64.zip
cp -R ./nwjs-sdk-v0.20.3-win-x64/* ./

fi

rm -rf ./nwjs-*
cd ..
