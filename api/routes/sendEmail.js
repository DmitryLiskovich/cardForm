const express = require('express');
const router = express.Router();
const mailer = require('sendmail')({silent: true});

router.post('/', (req, res)=>{
	console.log(req.body);
	mailer({
		from: '"dmitryliskovich.github.io" <dmitry.liskovich@github.com>',
		to: 'dimalis199586@gmail.com',
		subject: 'Message from github page',
		html: `<p style='font-style: italic, font-size: 18px'>${req.body.text}</p>`
	}, (err, repl)=>{
		if(err){
			console.log(err);
			return res.status(400).json({message: err});
		}else{
			return res.status(200).json({message: 'Ok'});
		}
	})
});

module.exports = router;