cp -R ./appBuild ./out/c9cloud
cp ./server.js ./out/c9cloud/server.js
cd ./out
tar -cvf ./c9cloud.tar ./c9cloud
rm -rf ./c9cloud
cd ..