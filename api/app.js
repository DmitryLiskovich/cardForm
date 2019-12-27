const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
