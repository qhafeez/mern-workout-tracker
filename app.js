let express = require("express");
let cors= require("cors");
let mysql = require("mysql");
const util = require("util");
const keys = require("./config/keys");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const bodyParser = require("body-parser");
const flash= require("connect-flash");
const path= require("path");

console.log("process env");
console.log("-------");
console.log(process.env.PWD);

const cookieSession = require("cookie-session");



let app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));


app.use(cookieSession({
	maxAge:24 * 60 * 60 * 1000,
	keys:[keys.session.cookieKey]	
}));


// Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))






app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
	console.log("inside prod");
	app.use(express.static(path.join(__dirname,'client/build')));
} 

console.log("1");


let connection =keys.connection;

//this prevents the database connection from closing
//by querying this meaningless query every five seconds
setInterval(()=>{
	connection.query("SELECT 1");
}, 5000);


// let options = {
// 		origin:"https://workout-tracker-qh.herokuapp.com",
// 		credentials:true,
// 		allowHeaders:"Content-Type"
// 	}
// app.use(cors(options));



 
app.get("/google", passport.authenticate("google",{

	scope:['profile'],
	failureFlash:"failure"

}),(req,res)=>{
	// console.log(req.flash());
	console.log("/google route");
});


// app.get("/google",  (req,res)=>{
// 	res.send("hello");
// });


//callback route for google to redirect to
app.get("/auth/google/redirect", passport.authenticate("google"), (req,res)=>{
	console.log("isinde redirect");
	console.log(req.user)
	
	res.redirect("http://workout-tracker-qh.herokuapp.com/?token="+req.user.token);
	// res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

});


app.get("/logoutExp",(req,res)=>{

	console.log("logout");
	req.logout();
	res.redirect("/");
	// connection.end();
	//////
})
		  	
app.post("/addExercise", (request, res)=>{
	console.log(request.body);

	let workoutId = request.body.exObj.workoutId; //this comes from the request body;
	let numberOfSets = request.body.exObj.numSets;
	let maxReps = request.body.exObj.maxReps;
	let exerciseName = request.body.exObj.exerciseName;
	let weight = request.body.exObj.weight

	addExercise(connection, workoutId, exerciseName, weight).then(results=>{
	
	let exerciseId = results.insertId;
	

	// response.send(exerciseId);
		return addSets(connection, exerciseId, numberOfSets, maxReps)
	}).then(response=>{

		return getWorkout(connection, workoutId)
	}).then(response=>{
		res.send(response);
	}).catch(err=>{
		console.log(err);
	})
	

})

app.post("/deleteWorkout", (req,res)=>{

	if(req.session.passport.user.token === req.body.token ){

		let workoutId = req.body.workoutId;
		let userId = req.session.passport.user.userId;

		


		


		deleteWorkout(connection, workoutId).then(response=>{

				
		
				return workoutHistory(connection, userId)
			}).then(response=>{
				res.send(response)
			}).catch(err=>{
				console.log(err);
			})


	}

})

app.get("/redirected", (req, res)=>{
	console.log("redirecta");
})


app.post("/retrieveHistory", (req,res)=>{

	if(req.session.passport.user.token === req.body.token ){
		let userId = req.session.passport.user.userId;

		console.log(userId);
		workoutHistory(connection, userId).then(response=>{
			let arr=[];
			for(let i=0; i<response.length; i++){
				arr[i]=response[i].workoutId;

			}
			// console.log(arr);
			if(response.length ===0){
				res.send("0");
			}
			console.log("inside workouthistory then");
			console.log(arr);
			return getExercisesInWorkout(connection, arr).then(response=>{
				console.log("inside wh geiw");
				// console.log(response);
				return getWorkout(connection, arr).then(response=>{
					console.log("sldkfjhasldj")
					res.send(response);
				})
			})
	
		}).catch(err=>{
			console.log(err);
		})

	}	

})


//this route  retrieves the ongoing incomplete workout if one exists 
app.post("/retrieveCurrent",  (req, res)=>{
	let globalRes = res;

		if(req.session.passport.user.token === req.body.token ){
			let userId = req.session.passport.user.userId;
			console.log(userId);


			//checking to see if any incomplete workouts exist, if one does, it will be retrieved.
			//if not, one will be created
			checkForIncompleteWorkout(connection, userId).then(response=>{
				console.log("inside checkForIncompleteWorkout")
				console.log(response.length);
				if(response.length < 1){
						
					// 	console.log("inside if");

					// return getIdOfMostRecentWorkout(connection, userId).then(response=>{
						
						

					// 		return getWorkout(connection, response[0].workoutId).then(response=>{
					// 			res.send(response);
					// 		})
							
					// }).catch(err=>{
						
					// 	console.log(err);
					// })

					
					//creating new workout
					makeNewWorkout(connection,userId).then(response=>{
						console.log("inside mnw");
						console.log(response);
						//retrieving new workout to send back to client
						return getWorkout(connection, response.insertId)
					}).then(response=>{
						res.send(response[0])
					})	
			
				} else{

						let workoutId = response[0].workoutId;

						getWorkout(connection, workoutId).then(response=>{
							console.log("inside else gw");
							console.log(response);
							res.send(response[0]);
						}).catch(err=>{
							console.log(err)
						});		
					
					

				}
			
			}).catch(err=>{console.log(err)})
		
		} else {



		}

	// res.send(req.session.user);

})

app.post("/completeWorkout", (req,res)=>{

	if(req.session.passport.user.token === req.body.token ){

		let workoutId = req.body.workoutId;
		console.log(workoutId);
		completeWorkout(connection, workoutId).then(response=>{
			res.send(response);
		}).catch(err=>{
			res.send(err);
		})

	}

})



// app.options("/google", cors());
// app.use(cors(
// {origin:"http://localhost:3000",
// 	credentials:true,
// 	allowHeaders:"Content-Type"
// }
// ));


//this code checks to see if an incomplete workout is open for the user

app.post("/addRep", (req,res)=>{

	if(req.session.passport.user.token === req.body.token ){
		let setId = req.body.setId;
		let workoutId = req.body.workoutId;
		console.log(workoutId);
		addRep(connection, setId).then(response=>{
	
			
			
				return getWorkout(connection, workoutId).then(response=>{
					res.send(response);
				});

				
				// return getExercisesInWorkout(connection, )
			}).catch(error=>{
	
				res.send(error);
	
			})

	}

})

app.post("/notesHandler", (req,res)=>{

	if(req.session.passport.user.token === req.body.token ){

		let workoutId = req.body.workoutId;
		let notes = req.body.notes;
		notesHandler(connection, workoutId, notes).then(response=>{

			return getWorkout(connection, workoutId).then(response=>{

				res.send(response);

			})

		}).catch(err=>{

			res.send(err);

		})

	}

})

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, 'client','build')));
// }



function getIdOfMostRecentWorkout(connection, userId){
	
	return new Promise((resolve,reject)=>{

		connection.query("SELECT workoutId FROM workouts WHERE userId =? ORDER BY workoutDate DESC LIMIT 1", userId,(error,results)=>{
			
			if(error)reject(error);

			resolve(results);
		})


	})


}


async function getWorkout(connection, workoutId){



	let arr;
	if(typeof workoutId === "number"){
		arr = [workoutId];
	} else{

		arr=workoutId;

	}
	console.log(arr);

	
	// console.log(arrOfWorkouts);
				
// console.log("inside addreap "+workoutId);


   let arrOfWorkouts = await Promise.all(arr.map(async id=>{







 

		
	let workoutObject={
							date:null,
							workout:[],
							notes:null,
							// workoutId:null
					
						}


					   return getWorkoutDate(connection, id).then(res=>{
						// console.log("inside gwd");
						let a = id;
					workoutObject.date = res[0];

					// workoutObject.workoutId = a;
					// console.log(a);


							//this is retrieving the existing open workout
					    return getExercisesInWorkout(connection, a);
					}).then(results=>{

								console.log("inside geiw in gww");
								console.log(results);
								console.log("results length");
								console.log(results.length);

								//this if statement return the workout object
								//with the date defined and an empty workout array
								//this happens when it is a new workout
								//sending the object back allows the client to
								//
								if(results.length ===0){
									workoutObject.workoutId = arr[0];
									return workoutObject;

								}
						//results is an array of rows from the database
						// console.log("inside geiw");
						// console.log(results);

										//this code puts the data in the desired format
											let i =0;
							let workoutsArray =[];
						

								let exerciseObject={exerciseId:null,
									exerciseName:null,
									weight:null,
									maxReps:null,

									sets:[]
								}

								// console.log(results);

							while(results[i]){
								// console.log(util.inspect(workoutsArray, false,null,true));
								exerciseObject.exerciseId = results[i].exerciseId;
								exerciseObject.exerciseName = results[i].exerciseName;
								exerciseObject.weight = results[i].weight,
								exerciseObject.maxReps = results[i].maxReps,
								exerciseObject.sets.push({setId:results[i].setId, reps:results[i].reps});
								// console.log(exerciseObject.exerciseId + "  "+ results[i].exerciseId);
								
								// console.log(exerciseObject);
								if((results[i+1]!==undefined && exerciseObject.exerciseId !== results[i+1].exerciseId)|| i === results.length-1){

										// console.log(exerciseObject);
										// console.log(workoutsArray);
										let aaa = {...exerciseObject};
										aaa.numberOfSets = aaa.sets.length;
										workoutObject.workout.push(aaa);
										// console.log(util.inspect(workoutsArray, false,null,true));
										
										
										exerciseObject.sets=[];
										
								
									}
												
								
								
								
								// console.log(exerciseObject);
								i++;
							}
							 
		// console.log(util.inspect(workoutsArray, false,null,true));
								workoutObject.notes = results[0].notes;
								workoutObject.workoutId = results[0].workoutId;
							//sending workout back to client
								return workoutObject;	

								console.log(arrOfWorkouts);
								
							

						}).catch(err=>{console.log(err)})




	}));

return arrOfWorkouts

}



function deleteWorkout(connection, workoutId){
	return new Promise((resolve,reject)=>{

		connection.query("DELETE FROM workouts WHERE workoutId = ?", workoutId, (err,res)=>{
			
			if(err) reject(err);

			resolve(res);
		
		})

	})
}

function completeWorkout(connection, workoutId){
	return new Promise((resolve, reject)=>{

		connection.query("UPDATE workouts SET completed = 1 WHERE workoutId = ?", workoutId, (err,res)=>{
			if(err) reject(err);

			resolve(res);
		})

	})
}


function checkForIncompleteWorkout(connection, userId){



	return new Promise((resolve, reject)=>{

		 connection.query("SELECT workoutId FROM workouts WHERE completed = 0 AND userId = ?", userId, (error, results)=>{
		
			if(error) return reject(error);
			
			resolve(results)
		
		})	



	})		

	

	

}

function workoutHistory(connection, userId){


	return new Promise((resolve, reject)=>{

		 connection.query("SELECT workoutId FROM workouts WHERE userId = ? AND completed =1", userId, (error, results)=>{
		
			if(error) return reject(error);
			
			resolve(results)
		
		})	



	})


}


//this is the code to create a new workout
makeNewWorkout=(connection,userId)=>{

	return new Promise((resolve, reject)=>{

	connection.query("INSERT INTO workouts (userId) VALUES (?)", userId, (error,results)=>{
		
		if(error) return reject(error);

		resolve(results);
	})
})

}


//this is the code to add a new exercise to a workout
addExercise=(connection, workoutId, exerciseName, weight)=>{
	return new Promise((resolve, reject)=>{

		connection.query("INSERT INTO exercisesPerWorkout (workoutId, exerciseName, weight) VALUES (?, ?, ?)", [workoutId, exerciseName, weight], (error,results)=>{

			if(error) return reject(error);

			resolve(results)


		})	

	})


}


//this code adds sets to an exercise

addSets=(connection, exerciseId, numberOfSets, maxReps)=>{
	return new Promise((resolve,reject)=>{

		let data = [
				
		]
		for(let i=0; i<numberOfSets; i++){
			data.push([exerciseId, maxReps]);
		}

		connection.query("INSERT INTO sets (exerciseId, maxReps) VALUES ?", [data], (error,results)=>{

			if(error) return reject(error);

			resolve(results)


		})

	})
}


//this code adds a rep to a set
addRep=(connection, setId)=>{
	
	return new Promise((resolve,reject)=>{

		connection.query("UPDATE sets SET reps= CASE WHEN reps < (SELECT maxReps FROM (SELECT * FROM sets) AS temp WHERE setId = ?) THEN reps+1 ELSE 0 END WHERE setId = ?", [setId,setId], (error,results)=>{

			if(error) return reject(error);

			resolve(results);

		})			

	})

}





function getWorkoutDate(connection, workoutId){
	return new Promise((resolve,reject)=>{
		connection.query("SELECT EXTRACT(MONTH FROM workoutDate) AS month, EXTRACT(DAY FROM workoutDate) AS day, EXTRACT(YEAR FROM workoutDate) AS year FROM workouts WHERE workoutId =  ?", workoutId, (err,res)=>{
			if(err) reject(err);

			resolve(res);
		})
	})
}



//this code will get us all the exercises in a workout
function getExercisesInWorkout(connection,workoutId){
		let wid;
		let q;
		let andClause ="";
		

		if( typeof workoutId === "number"){
			wid = workoutId;
			q = "exercisesPerWorkout.workoutId=?";
		} else{
			wid = [[workoutId]];
			q="exercisesPerWorkout.workoutId IN ?"
		}

		console.log(q);
		console.log(andClause);

	return new Promise((resolve,reject)=>{

		connection.query("SELECT workouts.workoutId, workouts.notes, exercisesPerWorkout.exerciseId, exercisesPerWorkout.exerciseName, exercisesPerWorkout.weight, sets.setId, sets.reps, sets.maxReps FROM workouts JOIN exercisesPerWorkout on workouts.workoutId = exercisesPerWorkout.workoutId JOIN  sets ON exercisesPerWorkout.exerciseId = sets.exerciseId WHERE "+q, wid,(error, results)=>{

			if (error) return (error);
			// console.log(results);
			
			resolve(results)

		
		})

	})
}

notesHandler=(connection, workoutId, notes)=>{

	return new Promise((resolve, reject)=>{

		connection.query("UPDATE workouts SET notes = ? WHERE workoutId = ?", [notes, workoutId], (error, results)=>{
			
			if (error) return (error);

			resolve(results);
		
		})

	})


}





// makeNewWorkout(connection);

// let   a =   checkForIncompleteWorkout(connection).then(response=>{
// 			if(response[0].count === 0){
// 				return makeNewWorkout(connection).then(results=>{
// 					console.log(results);
// 				})
// 			} else{
// 				console.log("open workout exists for this user");
// 			}
// });



// addExercise(connection).then(results=>{
// 	console.log(results);
// })


// addSets(connection).then(results=>{
// 	console.log(results);
// })



// addExercise(connection).then(results=>{
// 	let exerciseId = results.insertId;
// 	console.log(exerciseId);
		
// 		return addSets(connection, exerciseId, 3, 11).then(results=>{
// 			 connection.end();
// 			}).catch(error=>{
// 				console.log(error);
// 				connection.end();
// 			});
		 

// }).catch(err=>{
// 	console.log(error);
// 	connection.end();
// })








// connection.end();

// class Greeting {

// 	constructor()

// }


const port = process.env.PORT || 4000;
let http = require("http");
let server = http.createServer(app,(req,res)=>{
	res.writeHead(200, {"Access-Control-Allow-Origiin": "*"})
});

app.get("/service-worker.js", (req, res) => {
	console.log("service workerssssss");
  res.sendFile(path.join(__dirname + "app/client","build", "service-worker.js"));
});

app.get('/*', (req, res) => {
	console.log("catchallll");
	console.log(req.hostname);
	console.log(req.path);
	// console.log(path.join(__dirname + '/client', 'build', 'index.html'));
 //  res.sendFile(path.join(__dirname + '/client', 'build', 'index.html'));
 res.redirect(req.path);
})

server.listen(port, ()=>{
	console.log("Listening on "+ port)
});
// app.listen(4000, () => console.log("Listening on port 4000!"));
