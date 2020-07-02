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
	const info = await mongoose.model('users', User).findOne({login: login});
	res.status(200).json({
		login: info.login,
		email: info.email,
		id: info._id,
		first_name: info.first_name,
		last_name: info.last_name,
		sessions: info.sessions,
		friends: info.friends
	});
})

module.exports = router;