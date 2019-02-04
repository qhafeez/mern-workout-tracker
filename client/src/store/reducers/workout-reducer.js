import * as actionTypes from  "../actions/actionTypes";



const initialState ={

	currentWorkout:null,
	loading:false,
	inProgress:false,
	workoutHistory:null,
	exerciseModalShow:false,
	notesModalShow:false,
	workoutAddProcessing:false,
	workoutAddMessage:null,
	oneWorkout:null

};

const reducer = (state = initialState, action) => {


	switch(action.type){


		case actionTypes.FETCH_WORKOUT_START:
			return{
				...state,
				loading:true
			}

		case actionTypes.FETCH_WORKOUT_SUCCESS:
			return{
				...state,
				loading:false,
				currentWorkout: action.currentWorkout,
				inProgress:true 
				//action.orders come from the FETCH_ORDERS_SUCCESS action creator
			}

		case actionTypes.FETCH_WORKOUT_FAIL:
			return{
				...state,
				currentWorkout:null,
				loading:false,
				inProgress:false
				
				
			}

		case actionTypes.FETCH_WORKOUT_HISTORY_SUCCESS:
			return{
				...state,
				workoutHistory:action.workoutHistory
				
				
			}

		case actionTypes.EXERCISE_MODAL_SHOW:
			return{
				...state,
				exerciseModalShow:true
				
				
			}

		case actionTypes.EXERCISE_MODAL_CLOSE:
			return{
				...state,
				exerciseModalShow:false,
				workoutAddMessage:null
				
			}

		case actionTypes.NOTES_MODAL_OPEN:
			return{
				...state,
				notesModalShow:true
				
				
			}

		case actionTypes.NOTES_MODAL_CLOSE:
			return{
				...state,
				notesModalShow:false
				
				
			}

		case actionTypes.ADD_EXERCISE_START:
			return{
				...state,
				workoutAddProcessing:true,
				workoutAddMessage:null
			}

		case actionTypes.ADD_EXERCISE_SUCCESS:
			return{
				...state,
				workoutAddProcessing:false,
				workoutAddMessage:"Exercised Added"
				// currentWorkout: action.currentWorkout,
				
				//action.orders come from the FETCH_ORDERS_SUCCESS action creator
			}

		case "REMOVE_COMPLETED":
			return{
				...state,
				currentWorkout:null
			}

		case actionTypes.FETCH_ONE_WORKOUT_SUCCESS:

			return{
				...state,
				oneWorkout:action.oneWorkout
			}

		case actionTypes.FETCH_ONE_WORKOUT_FAIL:

			return{
				...state,
				oneWorkout:action.oneWorkout
			}

		case actionTypes.RESET_ONE_WORKOUT_NULL:

			return{
				...state,
				oneWorkout:action.oneWorkout
			}

		// case actionTypes.FETCH_WORKOUT_FAIL:
		// 	return{
		// 		...state,
		// 		currentWorkout:null,
		// 		loading:false,
		// 		inProgress:false
				
				
		// 	}

			

		default:
			return state;


	}


}

export default reducer;