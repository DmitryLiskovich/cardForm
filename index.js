require("dotenv").config();
const http = require('http');
const app = require("./api/app");
const Users = require('./api/routes/database/Users');
const Chats = require('./api/routes/database/Chats');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 8000;

const chats = mongoose.model('chats', Chats);
const users = mongoose.model('users', Users);

mongoose.connect(process.env.DB_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true  
})

const server = http.createServer(app);
server.listen(port, ()=>{
	const port = server.address().port;
	console.log("Express is open on port " + port);
});

// Socket controller
const io = require('socket.io').listen(server);

io.on('connection', (socket)=>{
	
	socket.on('join', async (room, usersInChat)=>{
		let newRoom = room;

		if(room === 'new'){
			newRoom = uuidv4();
			chats.create({
				chat_id: newRoom,
			})
			const user1 = await users.findOne({_id: usersInChat[0]});
			const user2 = await users.findOne({_id: usersInChat[1]});
			users.updateOne({_id: usersInChat[0]}, {sessions: {...user1.sessions, [usersInChat[1]]: newRoom}}).catch(e => console.log(e));
			users.updateOne({_id: usersInChat[1]}, {sessions: {...user2.sessions, [usersInChat[0]]: newRoom}}).catch(e => console.log(e));
		}

		const messages = await chats.findOne({chat_id: newRoom});
		
		socket.join(newRoom);
		socket.emit('messages', messages.messages);
		
		socket.on('message', async (message) => {
			const newMessage = {message, user: usersInChat[0], date: new Date()}
			messages.messages.push(newMessage);
			await chats.updateOne({chat_id: newRoom}, {messages: messages.messages}).catch(e => console.log(e));
			socket.broadcast.to(newRoom).send(newMessage);
		})

		socket.on('leave', () => {
			socket.leave(newRoom);
			socket.removeAllListeners('leave');
			socket.removeAllListeners('message');
			socket.removeAllListeners('disconnect');
		})

		socket.on('disconnect', () => {
			socket.leave(newRoom);
			socket.removeAllListeners('leave');
			socket.removeAllListeners('message');
			socket.removeAllListeners('disconnect');
		})
	})
})