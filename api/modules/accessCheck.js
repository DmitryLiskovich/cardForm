const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

function accessCheck (req, res, next) {
	try {
		jwt.verify(req.cookies.jwt, process.env.PRIVAT_KEY);
		const data = jwt.decode(req.cookies.jwt);
		if(data.iat < Date.now()){
			throw new Error('Expiration');
		}
		next();
	}
	catch (e) {
		const data = jwt.decode(req.cookies.jwt);
		const refresh = req.cookies.refresh;
		if(refresh) {
			res.cookie('jwt', jwt.sign({...data, iat: Date.now() + 60000}, process.env.PRIVAT_KEY));
			res.cookie('reftresh', uuidv4(), {httpOnly: true});
			next();
		} else {
			return res.status(401).json({message: 'How did you get access?'});
		}
	}
}

module.exports = accessCheck;