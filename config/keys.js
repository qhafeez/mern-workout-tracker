//add this file to .gitignore
const mysql = require("mysql");

module.exports={

	google:{
		clientID:"460480664500-ae5lci0tk8ehcnhmirf2l7nc8jgu3b1s.apps.googleusercontent.com",
		clientSecret:"_bQWjHUtAUGSQrR0it6MWFCo"
	},
	connection:mysql.createConnection({
		    
		    host: "localhost",
		    user: "root",
		    password: "root",
		    database: "Workout_Tracker",
		    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
		}),
	session:{
		cookieKey:"a;dslfk43950p"
	}
	

};