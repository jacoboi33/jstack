const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
server.listen(3000, function() {
    console.log('Express server listening on port ' + server.address().port);
});

/** Begin websockets */
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection(ws) {
    const numClients = wss.clients.size;
    console.log('Clients connected ', numClients);

    wss.broadcast('Current Visitors: ' + numClients);

    if (ws.readyState === ws.OPEN) {
        ws.send('Welcome to the server!');
    }

    ws.on('close', function close() {
        wss.broadcast(`Current Visitors: ${numClients - 1}`);
        console.log('a client has disconnected');
    });
})

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) { 
        client.send(data);

        // if (client.readyState === client.OPEN) {
        //     client.send(data);
        // }
    });
}