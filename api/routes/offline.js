const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./database/Users');
const jwt = require('jsonwebtoken');
const accessCheck = require('../modules/accessCheck');

mongoose.connect(process.env.DB_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true  
});

router.get('/', accessCheck, async (req, res) => {
	const login = jwt.decode(req.cookies.jwt).login;
	await mongoose.model('users', User).updateOne({login: login}, {isOnline: JSON.parse(req.query.st)});
	res.status(200).json({message: 'logout'});
})

module.exports = router;