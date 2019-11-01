require("dotenv").config();
const connection = require("./dbconfig");

function antiSpam(req, res, next){
	connection.query(
		`SLECT * FROM antiSpam WHERE ip='${req.connection.adress}'`,
		(err, response) => {
		console.log(response);
		  if(response.length){
			  if(Date() - response[0].request_date < 1200000){
				console.log(Date() - response[0].request_date);
				  return res.status(400).json({message: 'Try in 20 min'});
			  }else{
				  connection.query(`UPDATE antiSpam SET request_date=${Date()} WHERE ip='${req.connection.adress}'`);
				  next();
			  }
		  }else{
			connection.query(`INSERT INTO antiSpam VALUES (default, '${req.connection.adress}', ${Date})`);
			next();
		  }
		}
	  );
}

module.exports = antiSpam;