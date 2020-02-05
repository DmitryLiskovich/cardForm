const express = require('express');
const router = express.Router();
const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dimalis199586@gmail.com',
    pass: '164200Dima'
  }
});
const antiSpam = require('./antiSpam');

router.get('/', antiSpam, (req, res)=>{
	return res.status(200).json({message: 'ok'});
})

router.post('/',  (req, res)=>{
	transporter.sendMail({
		from: '"dmitryliskovich" <dmitry.liskovich@github.com>',
		to: 'dimalis199586@gmail.com',
		subject: `${req.body.them}`,
		html: `<h1>${req.body.them}</h1><p style='font-style: italic; font-size: 14px'>${req.body.text}</p>`
	}, (err, repl)=>{
		if(err){
			return res.status(400).json({message: err});
		}else{
			return res.status(200).json({message: 'Ok'});
		}
	})
});

module.exports = router;