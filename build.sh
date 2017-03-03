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
nwbuild -p win64,osx64,linux32,linux64 -v 0.20.1 ./build -o ./out

cd ./out/mcs-lite-app/win64
mkdir mcs-lite-app

cd ../../..
cd ./out/mcs-lite-app/osx64
mkdir mcs-lite-app

cd ../../..
cp -R ./appBuild/ ./out/mcs-lite-app/win64/mcs-lite-app
cp -R ./appBuild/ ./out/mcs-lite-app/osx64/mcs-lite-app
