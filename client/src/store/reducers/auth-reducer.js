import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

//updateObject is a helper function that makes updating the state easier


const initialState = {

	token:null,
	// userId: null,
	error:null,
	loading:false,
	authRedirectPath: "/",
	
	

}

const authStart = (state , action) => {

	return updateObject(state, {error: null, loading: true});


}

const authSuccess = (state, action) =>{

	return updateObject(state, {
		token: action.token,
		// userId: action.userId,
		error:null,
		loading: false,
		
	});

}

const authFail = (state, action) =>{

	return updateObject(state, {
		error:action.error,
		loading:false
	});

}

const authLogout = (state, action) =>{

	return updateObject(state, {
		token:null,
		// userId:null,
		authRefreshPath:null
	})


}

const setAuthRedirectPath = (state, action) =>{

	localStorage.setItem("redirectPath", action.path);
	return updateObject(state, { authRedirectPath:action.path });

}

// const setRefreshPath = (state, action) =>{

// 	localStorage.setItem("refreshPath", action.path);

// 	return updateObject(state, { authRefreshPath:action.path });

// }


const reducer = (state = initialState, action) => {

	switch(action.type){



		case actionTypes.AUTH_START:
			return authStart(state, action); 

		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);

		case actionTypes.AUTH_FAIL:
			return authFail(state, action);

		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);


		// case actionTypes.SET_AUTH_REFRESH_PATH:
		// 	return setRefreshPath(state, action);


		default: 
			return state;

	}


}

export default reducer;