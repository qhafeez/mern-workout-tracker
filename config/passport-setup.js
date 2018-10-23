const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");



//this method inserts the userId into a cookie. this is the id from the mysql database
//not the one returned from google
passport.serializeUser((userId, done)=>{

	done(null, userId);

});


//this code returns the user that correspond with the id that is stored in the cookie
passport.deserializeUser((user, done)=>{

	//the user parameter will be the user which is stored in a cookie.

	let userId = user.userId 

	return new Promise ((resolve,reject)=>{keys.connection.query("SELECT * FROM users WHERE userId  = ?",userId, (error, results)=>{
		if(error) return reject(error);

		resolve(results)
	})

} //end of promise
	).then(response=>{
		let user = response[0];

		done(null, user);

	}).catch(err=>console.log(err))



	

});






passport.use(new GoogleStrategy({
	//options for the google strat
	callbackURL:"/auth/google/redirect",
	clientID:keys.google.clientID,
	clientSecret:keys.google.clientSecret


},(accessToken, refreshToken, profile, done)=>{

	// console.log(profile);
	console.log(accessToken);
	let prof = profile;

	//passport callback function

	//this query below will check if the user that is logging in is already registered
	return new Promise ((resolve,reject)=>{keys.connection.query("SELECT * FROM users WHERE googleId = ?",prof.id, (error, results)=>{
		
		if(error) return reject(error);

		resolve(results)
	})

} //end of promise
	).then(response=>{
		
		
		let obj = {
			displayName:prof.displayName,
			googleId:prof.id
		}

		// console.log(displayName);
		if(response.length<1){
			//if there is no existing user with the googleId of the user, 
			//they will be added to the database with the code below

			return new Promise ((resolve,reject)=>{


				keys.connection.query("INSERT INTO users SET ?", obj, (error,results)=>{
						console.log("inside second query");
						if(error) reject(error);
						
						resolve(results);
					})
				//end of promise
			}).then(response=>{
				console.log("inside then method from second promise");

				//this method inserts the userId into a cookie. this is the id from the mysql database
				//not the one returned from google
				done(null, response.insertId)	
				// console.log(response);
			}).catch(err=>{
				console.log(err);
			})
			
		

		} else{
			//this done method is one of the argumenta that is passed into this callback
			//it is in the deserialize method

			//remember that sql SELECT returns an array.  
			//since this only returns an array with one element
			//we can use '0' to retreive it
			let aaa = response[0];
				aaa.token = accessToken;
			done(null, response[0])
			console.log("inside else");
			// console.log(response);

		}

	}).catch(err=>{
		//this catch if for the first promise
		console.log(err)
	});


	console.log("passport callback");
	// console.log(accessToken);
	// console.log(refreshToken);
})

)
// 