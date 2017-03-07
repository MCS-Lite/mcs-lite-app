#!/usr/bin/env bash

mkdir uploadImages && cd uploadImages && mkdir device && mkdir profile && mkdir prototype && cd ..

rm -rf ./nw.js-sdk
mkdir nw.js-sdk && cd nw.js-sdk

if [ "$(uname)" == "Darwin" ]; then
wget https://dl.nwjs.io/v0.20.3/nwjs-v0.20.3-osx-x64.zip
unzip ./nwjs-v0.20.3-osx-x64.zip
cp -R ./nwjs-v0.20.3-osx-x64/* ./

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
wget https://dl.nwjs.io/v0.20.3/nwjs-v0.20.3-linux-x64.tar.gz
gzip -d ./nwjs-v0.20.3-linux-x64.tar.gz
tar -xvf ./nwjs-v0.20.3-linux-x64.tar
cp -R ./nwjs-v0.20.3-linux-x64/* ./

elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
wget https://dl.nwjs.io/v0.20.3/nwjs-v0.20.3-win-x64.zip
unzip ./nwjs-v0.20.3-win-x64.zip
cp -R ./nwjs-v0.20.3-win-x64/* ./

fi

rm -rf ./nwjs-*
cd ..
