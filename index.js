const http = require('http');
require("dotenv").config();
const port = process.env.PORT || 80;
const app = require("./api/app");
let timer;

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
			peers[room] = [];
		}
		if(peers[room].some((item)=> item.userName === user)){
			socket.send({type: 'err', message: 'Already created'});
			return false;
		}else{
			socket.send({type: 'Ok', message: 'Created'});
		}
		peers[room].push({userName: user, callId: null, stream: null});
		let currentPeers = peers[room];
		socket.send(currentPeers);
		socket.on('message', (message)=>{
			currentPeers.forEach((item) => {
				if(item.userName === message.name){
					item.callId = message.peerID;
					socket.send(currentPeers);
				}
			});
			socket.broadcast.to(room).send(currentPeers);
		})
		socket.on('share-screen-user', (message)=>{
			socket.broadcast.to(room).emit('share-screen-user' ,message);
		})
		socket.on('disconnect', ()=>{
			peers[room] = peers[room].filter((item) => item.userName !== user);
			socket.broadcast.to(room).send(currentPeers);
		})
	})
})