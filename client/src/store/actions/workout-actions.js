import * as actionTypes from "./actionTypes";
import * as authActions from "./auth-actions";

/*this is a new axios instance.  it is not the one
  from axios-orders.  we are doing this because
  we don't use the baseURL that is set up in that one	
*/
import axios from "axios";
// import firebase from '../../fire.js';


export const fetchStart = () =>{

	return{
		type:actionTypes.FETCH_WORKOUT_START
	}

}

export const fetchCurrentSuccess = (workout) =>{

	return{
		type:actionTypes.FETCH_WORKOUT_SUCCESS,
		currentWorkout: workout
	}

}


export const fetchFail = () =>{

	return{
		type:actionTypes.FETCH_WORKOUT_FAIL
	}

}


export const fetchWorkoutHistory=(token)=>{

	return dispatch =>{

		
		axios.post("/retrieveHistory",{token:token}).then(res=>{
			console.log(res.data);
			if(res.data===0){
				dispatch(fetchHistorySuccess(null));
				return;
			}
			console.log(res.data);


			dispatch(fetchHistorySuccess(res.data.reverse()));

		}).catch(err=>{
	
			dispatch(authActions.logout());
	
		})


	}

}

export const createNewWorkout=(token)=>{
		return dispatch=>{
			dispatch(fetchStart());
			axios.post("/makeNewWorkout", {token:token}).then(res=>{
				console.log(res);
				dispatch(fetchCurrentSuccess(res.data));

			}).catch(err=>{
				console.log(err);
				dispatch(authActions.logout());
			})

		}
}

export const fetchCurrentWorkout = (token) =>{
	console.log(token);

	return dispatch =>{

			dispatch(fetchStart());

			axios.post("/retrieveCurrent", {token:token}).then(res=>{
				console.log(res);
				if(res.data.length === 0){
					console.log("no workout");
					dispatch(fetchFail());
				}else{
					console.log(res.data);
				dispatch(fetchCurrentSuccess(res.data));	
				}
				
			}).catch(err=>{
				console.log(err.message);
				dispatch(authActions.logout());
			})

	}

}



export const fetchHistorySuccess = (history) =>{

	return {

		type:actionTypes.FETCH_WORKOUT_HISTORY_SUCCESS,
		workoutHistory: history

	}

}

export const fetchOneWorkoutSuccess = (oneWorkout) =>{

	return {

		type:actionTypes.FETCH_ONE_WORKOUT_SUCCESS,
		oneWorkout: oneWorkout

	}

}

export const fetchOneWorkoutFail = () =>{

	return {

		type:actionTypes.FETCH_ONE_WORKOUT_FAIL,
		oneWorkout: 0

	}

}

export const resetOneWorkoutToNull =()=>{

	return {
		type:actionTypes.RESET_ONE_WORKOUT_NULL,
		oneWorkout:null
	}

}







//retrieves one workout for the CompletedWorkoutDisplay component
export const fetchOneWorkout =(token, workoutId)=>{

	return dispatch=>{

		axios.post("/retrieveWorkout", {token:token, workoutId:workoutId}).then(response=>{

			console.log(response);
			if(!response.data.hasOwnProperty("exist")){
				dispatch(fetchOneWorkoutSuccess(response.data));	
			} else{
				dispatch(fetchOneWorkoutFail())
			}
			

		}).catch(err=>{
			console.log(err);
			dispatch(authActions.logout());
		})

	}

}


export const deleteWorkout=(workoutId, token)=>{

	return dispatch=>{

		axios.post("/deleteWorkout", {workoutId:workoutId, token:token}).then(response=>{


			console.log(response);
				dispatch(fetchWorkoutHistory(token));

		}).catch(err=>{
			dispatch(authActions.logout());
		})

	}

}

export const removeCompleted = () =>{

	return {

		type:"REMOVE_COMPLETED",
		currentWorkout:null

	}
}


export const addExercise=(token, exObj)=>{
	
	return dispatch=>{

		dispatch(addExerciseStart());

		
		axios.post("/addExercise", {token:token,exObj:exObj}).then(response=>{
			console.log(response);
			dispatch(addExerciseSuccess());
			dispatch(fetchCurrentWorkout(token))
			
		}).catch(err=>{
			console.log(err);
			dispatch(authActions.logout());
		})



	}

}


export const addExerciseStart =()=>{

	return{
		type:actionTypes.ADD_EXERCISE_START
	}

}

export const addExerciseSuccess =()=>{

	return{
		type:actionTypes.ADD_EXERCISE_SUCCESS
	}

}



export const completeWorkout=(workoutId,token)=>{

	return dispatch=>{
		console.log(token);
		axios.post("/completeWorkout", {workoutId:workoutId, token:token}).then(response=>{
				console.log(response)
				dispatch(removeCompleted());

		}).catch(err=>{
			
			console.log(err);
			dispatch(authActions.logout());
		
		})

	}

}


export const repHandler = (setId,token, workoutId) =>{

		return dispatch =>{

				console.log(workoutId);
			axios.post("/addRep", {token:token, setId:setId, workoutId:workoutId}).then(response=>{

				console.log(response);

				dispatch(fetchCurrentSuccess(response.data[0]))
				

			}).catch(err=>{
				console.log(err);
				dispatch(authActions.logout());
			})

		}


}

export const updateNotes = (token, workoutId, notes) =>{

		return dispatch =>{

			axios.post("/notesHandler", {token:token, workoutId: workoutId, notes:notes}).then(response=>{

				console.log(response);
				dispatch(fetchCurrentWorkout(token));

			}).catch(err=>{
				console.log(err);
				dispatch(authActions.logout());
			})

		}


}

export const exerciseModalShow =()=>{
	return{
		type:actionTypes.EXERCISE_MODAL_SHOW
	}
}

export const exerciseModalClose =()=>{
	return{
		type:actionTypes.EXERCISE_MODAL_CLOSE,
		
	}
}

export const notesModalClose =()=>{
	return{
		type:actionTypes.NOTES_MODAL_CLOSE
	}
}

export const notesModalShow =()=>{
	return{
		type:actionTypes.NOTES_MODAL_OPEN
	}
}

