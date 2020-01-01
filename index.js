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
		if(!peers[room]){
			peers[room] = {};
			peers[room][user] = null;
			currentPeers = peers[room];
		}else{
			if(peers[room][user]){
				socket.send({type: 'err', message: 'Already created'});
				return false;
			}else{
				socket.send({type: 'Ok', message: 'Created'});
			}
			peers[room][user] = null;
			currentPeers = peers[room];
		}
		socket.send(currentPeers);
		socket.on('message', (message)=>{
			peers[room][user] = message;
			socket.broadcast.to(room).send(currentPeers);
		})
		socket.on('close', id => {
			console.log(id);
		});
		socket.on('disconnect', (name)=>{
			delete peers[room][user];
			
			socket.broadcast.to(room).send(currentPeers);
		})
	})
})