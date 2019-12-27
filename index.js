const http = require('http');
require("dotenv").config();
const port = process.env.PORT || 80;
const app = require("./api/app");

const server = http.createServer(app);
server.listen(port, ()=>{
	const port = server.address().port;
	console.log("Express is open on port " + port);
});

const io = require('socket.io').listen(server);

io.on('connection', (socket)=>{
	socket.on('message', (message, userId)=>{
		console.log(userId);
		socket.broadcast.send(message)
	})
	socket.on('disconnect', ()=>{
		socket.send({message:`User has been disconnected`, type: 'connect'});
	})
})