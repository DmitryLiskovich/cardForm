const http = require('http');
require("dotenv").config();
const port = process.env.PORT || 80;
const io = require('socket.io').listen(8081);
const app = require("./api/app");

const server = http.createServer(app);
server.listen(port, ()=>{
	const port = server.address().port;
	console.log("Express is open on port " + port);
});

io.on('connection', (socket)=>{
	socket.on('message', (message)=>{
		socket.broadcast.send(message)
	})
	socket.on('disconnect', ()=>{
		socket.send({message:`User has been disconnected`, type: 'connect'});
	})
})