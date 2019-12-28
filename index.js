const http = require('http');
require("dotenv").config();
const port = process.env.PORT || 80;
const app = require("./api/app");

const server = http.createServer(app);
server.listen(port, ()=>{
	const port = server.address().port;
	console.log("Express is open on port " + port);
});

const peers = {};

const io = require('socket.io').listen(server);

io.on('connection', (socket)=>{
	socket.on('join', (room, user)=>{
		socket.join(room);
		if(peers[room]){
			currentPeers = peers[room];
			socket.send(currentPeers);
		}
		socket.on('message', (message, user)=>{
			peers[room] = {};
			peers[room][user] = message;
			currentPeers = peers[room];
			socket.broadcast.to(room).send(currentPeers);
		})
		socket.on('close', id => {
			console.log(id);
		});
		socket.on('disconnect', (name)=>{
			delete peers[user];
		})
	})
})