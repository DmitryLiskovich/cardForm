const express = require('express');
const router = express.Router();
const mailer = require('sendmail')();

router.post('/', (req, res)=>{
	console.log(req.body);
	// sendEmail(req.body.text).catch(err=> console.log(err))
	mailer({
		from: '"My web page 👻" <dmitrylis@git.com>',
		to: 'dimalis199586@gmail.com' ,
		subject: 'Contact Page',
		text: req.body.text
	}, (err, repl)=>{
		console.log(err)
  		// console.dir(reply)
	})
	return res.status(200).json({message: 'OK'});

	// async function sendEmail(body){
	// 	let transporter = mailer.createTransport('SMTP',{
	// 		host: 'smtp.mail.ru',
	// 		port: 465,
	// 		auth: {
	// 			user: "dima_liskovich@mail.ru",
	// 			pass: '40752'
	// 		}
			

	// 	});
	// 	let info = await transporter.sendMail({
			
	// 	})
	// 	return res.status(200).json({message: 'OK'});
	// }
});

module.exports = router;