cp -R ./appBuild ./out/cloud
cp ./server.js ./out/cloud/server.js
cd ./out
tar -cvf ./cloud.tar ./cloud
rm -rf ./cloud
cd ..