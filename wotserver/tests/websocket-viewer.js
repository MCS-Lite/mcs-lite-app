var deviceId = process.env.deviceId || 'S1Mart-9g';
var deviceKey = process.env.deviceKey || '3a4eee2d697dc032334fcd9c1e1597fa2f56cfe8a222501f049dcb26a4e52f80';
var datachannelId = process.env.datachannelId || 'message';

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket client connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
});

client.connect('ws://localhost:8000/deviceId/' + deviceId + '/deviceKey/' + deviceKey + '/csv', '');
