cp -R ./appBuild ./out/appBuildForNvidiaTX1
cp ./server.js ./out/appBuildForNvidiaTX1/server.js
cd ./out
tar -cvf ./appBuildForNvidiaTX1.tar ./appBuildForNvidiaTX1
cd ..