const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./database/Users');
const bcrypt = require('bcrypt');
require("dotenv").config();

mongoose.connect(process.env.DB_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true  
});

router.post('/', async (req, res)=> {
	if(req.body.password !== req.body.confPassword){
		return res.status(401).json({message: 'Different passwords'});
	}

	const user = mongoose.model('users', User);
	const users = await user.find({login: req.body.login});
	
	if(users.length) {
		return res.status(401).json({message: 'This login is already in use'});
	}

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			user.create({
				...req.body,
				password: hash,
				salt: salt,
			});
		})
	})

	return res.status(200).json({message: 'OK'});
})

module.exports = router;