const express = require('express');
const router = express.Router();
const mailer = require('sendmail')({silent: true});

router.post('/', (req, res)=>{
	console.log(req.body);
	// sendEmail(req.body.text).catch(err=> console.log(err))
	mailer({
		from: 'test@yourdomain.com',
		to: 'dimlis199586@gmail.com',
		subject: 'MailComposer sendmail',
		html: 'Mail of test sendmail '
	}, (err, repl)=>{
		console.log(err.message)
		if(err){
			return res.status(400).json({message: err});
		}
  		// console.dir(reply)
	})
	

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