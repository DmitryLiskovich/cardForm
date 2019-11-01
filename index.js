const http = require('http');
require("dotenv").config();
const port = process.env.PORT || 80;
const app = require("./api/app");

const server = http.createServer(app);
server.listen(port, ()=>{
	const port = server.address().port;
	console.log("Express is open on port " + port);
});
