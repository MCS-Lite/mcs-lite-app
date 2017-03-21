cp -R ./appBuild ./out/nvidiaTX1
cp ./server.js ./out/nvidiaTX1/server.js
cd ./out
tar -cvf ./nvidiaTX1.tar ./nvidiaTX1
rm -rf ./nvidiaTX1
cd ..