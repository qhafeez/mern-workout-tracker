//add this file to .gitignore
const mysql = require("mysql");

module.exports={

	google:{
		clientID:"460480664500-ae5lci0tk8ehcnhmirf2l7nc8jgu3b1s.apps.googleusercontent.com",
		clientSecret:"_bQWjHUtAUGSQrR0it6MWFCo"
	},
	// connection:mysql.createConnection({
		    
	// 	    host: "us-cdbr-iron-east-01.cleardb.net",
	// 	    user: "b0135bf738c7d3",
	// 	    password: "e10a530f",
	// 	    database: "heroku_a21d24b05064cf9",
		    
	// 	}),
	connection:mysql.createConnection({
		    
		    host: "localhost",
		    user: "root",
		    password: "root",
		    database: "Workout_Tracker",
		    port:"8889"
		    
		}),
	session:{
		cookieKey:"a;dslfk43950p"
	}
	

};