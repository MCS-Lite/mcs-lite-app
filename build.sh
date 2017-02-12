rm -rf ./build
rm -rf ./out
mkdir build
cd build && mkdir client && cd client && mkdir app
cd ../..

cp -R ./client/app/build/ ./build/client/app/build
cp -R ./restserver/ ./build/restserver
cp -R ./wotserver/ ./build/wotserver
cp -R ./configs/ ./build/configs
cp -R ./nedb/ ./build/nedb
cp -R ./db/ ./build/db
cp -R index.html ./build/index.html
cp -R index.js ./build/index.js
cp -R package.json ./build/package.json
cp -R ./node_modules/ ./build/node_modules

mkdir out
nwbuild -p win64,osx64 -v 0.20.1 ./build -o ./out
cp -R ./build/ ./out/mcs-lite-app/win64/package.nw