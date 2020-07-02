const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./database/Users');
const accessCheck = require('../modules/accessCheck');

mongoose.connect(process.env.DB_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true  
});

router.get('/', accessCheck, async (req, res) => {
	const user = mongoose.model('users', User);
	const info = await user.find();

	res.status(200).json(info.map(item => ({
		login: item.login,
		id: item._id,
		email: item.email,
		first_name: item.first_name,
		last_name: item.last_name,
		sessions: item.sessions,
		friends: item.friends
	})));
})

module.exports = router;