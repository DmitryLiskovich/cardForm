require("dotenv").config();
const connection = require("./dbconfig");

function antiSpam(req, res, next){
	connection.query(
		`SELECT * FROM antiSpam WHERE ip='${req.connection.remoteAddress}'`,
		(err, response) => {
		  if(response.length){
			  if(Date.now() - response[0].request_date < 1200000){
				  return res.status(400).json({message: 'Try in 20 min'});
			  }else{
				  connection.query(`UPDATE antiSpam SET request_date=${Date.now()} WHERE ip='${req.connection.remoteAddress}'`);
				  next();
			  }
		  }else{
			connection.query(`INSERT INTO antiSpam VALUES (default, '${req.connection.remoteAddress}', ${Date.now()})`);
			next();
		  }
		}
	  );
}

module.exports = antiSpam;