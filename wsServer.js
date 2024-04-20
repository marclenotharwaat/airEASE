const WebSocket = require('ws');
const dbListener = require('./config/dbListener');
function startWebSocketServer() {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('listening', () => {
        console.log('WebSocket server is listening on port 8080');
    });
    wss.on('connection', function connection(ws) {
        console.log('New client connected');
        dbListener.on('change', (data) => {
            ws.send(JSON.stringify(data), (error) => {
                if (error) {
                    console.error('Error sending message to client:', error);
                }
            });
        });        
        ws.on('close', () => {
            console.log('Client disconnected');
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    wss.on('error', (error) => {
        console.error('WebSocket server error:', error);
    });
}

module.exports = startWebSocketServer;
