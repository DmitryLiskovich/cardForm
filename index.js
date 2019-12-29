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
	socket.on('join', (room, user, id)=>{
		socket.join(room);
		console.log(id);
		if(!peers[room]){
			peers[room] = {};
			peers[room][user] = id;
			currentPeers = peers[room];
		}else{
			peers[room][user] = id;
			currentPeers = peers[room];
		}
		socket.send(currentPeers);
		socket.on('message', (message)=>{
			socket.broadcast.to(room).send(currentPeers);
		})
		socket.on('close', id => {
			console.log(id);
		});
		socket.on('disconnect', (name)=>{
			delete peers[room][user];
		})
	})
})