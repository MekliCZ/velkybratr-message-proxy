const WebSocket = require('ws');
const http = require('http');
const url = require('url');

let clients = {};

const wss = new WebSocket.Server({ port: 8080 });

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	const query = url.parse(req.url,true).query;
	console.log(query);
	const queryClients = query.userIds.split(',');
	queryClients.forEach((item) => {
		if (typeof clients[parseInt(item)] !== 'undefined') {
			clients[parseInt(item)].send(JSON.stringify({
				chatId: parseInt(query.chatId),
			}));
		}
	});
	res.end(JSON.stringify({"status": "ok"}));
}).listen(8090);

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		const parsedMessage = JSON.parse(message);
		if (parsedMessage.type === 'start') {
			clients[parsedMessage.data.id] = ws;
		}
		console.log(`Message ${parsedMessage.type} with data ${JSON.stringify(parsedMessage.data)}`);
	});

	// ws.send(JSON.stringify({key: 'value'}));
});
