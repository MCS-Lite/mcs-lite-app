cp -R ./appBuild ./out/mcs-lite-app/7688
cp ./server.js ./out/mcs-lite-app/7688/server.js
cd ./out/mcs-lite-app/7688
npm uninstall wotcity.io --save
npm i https://github.com/wotcity/wotcity-wot-framework.git#0.12 --save

cd ./node_modules
rm -rf ./websocket
wget https://s3-ap-southeast-1.amazonaws.com/mtk.linkit/Mediatek-Cloud/websocket/7688.tar
tar -xvf ./7688.tar ./websocket && cd ..
cd ../../..