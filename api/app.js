const express = require("express");
const app = express();
const io = require('socket.io').listen(3001);
const bodyParser = require("body-parser");

io.on('connection', (socket)=>{
	socket.on('message', (message)=>{
		socket.broadcast.send(message)
	})
	socket.on('disconnect', ()=>{
		socket.send({message:`User has been disconnected`, type: 'connect'});
	})
})

app.disable("x-powered-by");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: "application/json" }));

const sendEmail = require("./routes/sendEmail");
app.use("/email", sendEmail);

module.exports = app;
