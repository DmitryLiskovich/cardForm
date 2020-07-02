const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookiesParser = require('cookie-parser');

app.disable("x-powered-by");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiesParser());

app.use(bodyParser.json({ type: "application/json" }));

const auth = require("./routes/auth");
app.use("/auth", auth);

const register = require("./routes/register");
app.use("/register", register);

const users = require("./routes/users");
app.use("/users", users);

const allUsers = require("./routes/allUsers");
app.use("/allUsers", allUsers);

module.exports = app;
