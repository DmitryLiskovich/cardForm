const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./database/Users');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

mongoose.connect(process.env.DB_URL, { 
	useNewUrlParser: true,
	useUnifiedTopology: true  
});

router.post('/', async (req, res) => {
	if(!req.body.login || !req.body.password){
		return res.status(401).json({message: 'Invalid username or password'});
	}
	const user = await mongoose.model('users', User).findOne({login: req.body.login});

	const result = await bcrypt.compare(req.body.password, user.password);
	if(result) {
		const token = jwt.sign({
			login: req.body.login,
			email: req.body.email,
			iat: Date.now() + 60000
		}, process.env.PRIVAT_KEY);
		const refreshToken = uuidv4();;
		res.cookie('jwt', token);
		res.cookie('refresh', refreshToken, {httpOnly: true});
		return res.status(200).json({message: 'U are welcome ^_^'});
	} else {
		return res.status(401).json({message: 'Somthing is wrong O_o'});
	}
})

router.get('/', (req, res) => {
	res.cookie('why', 'I hate');
	res.status(200).json({message: 'Okay'});
})

module.exports = router;