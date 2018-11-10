import * as actionTypes from "./actionTypes";

/*this is a new axios instance.  it is not the one
  from axios-orders.  we are doing this because
  we don't use the baseURL that is set up in that one	
*/
import axios from "axios";
import firebase, { authRef, provider } from '../../fire.js';




export const authStart = () =>{
	//this is used to change the state to 'loading'
	return {
		type:actionTypes.AUTH_START
	}


}

export const authSuccess = (token) =>{
	



	return {
		type:actionTypes.AUTH_SUCCESS,
		token:token,  //this will be referred to as action.idToken in the reducer
		// userId:userId,
			//this will be referred to as action.userId in the reducer
	}

	
}

export const authFail = (error) =>{

	return {
		type:actionTypes.AUTH_FAIL,
		error:error
	}

	
}

export const logout = () =>{

return dispatch=>{
	axios.post("/logout").then(res=>{
		console.log(res);
		localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	localStorage.removeItem("redirectPath");
	localStorage.removeItem("refreshtPath");
	console.log("logout");
		return{

		type:actionTypes.AUTH_LOGOUT,

	}

	}).catch(err=>{
		console.log(err);
	})

	}
	

}

export const checkAuthTimeout = (expirationTime) =>{

	return dispatch => {
		console.log("checkAuthTimeout");
		setTimeout(()=>{

			dispatch(logout());

		}, expirationTime * 1000);
			//the expiration time that is returned from firebase is 3600 seconds
			//setTimeout expects time in milliseconds.  this turns it into 36000 milliseconds
			//this will dispatch the logout action in 36000 ms, which is one hour
	};

};

export const auth = (token)=>{
	return dispatch=>{
		console.log("auth action auth");
		console.log(token);
	localStorage.setItem("token", token);

	dispatch(authStart());
	dispatch(authSuccess(token));
}

}

// export const auth = (email, password, isSignup) =>{

// 	//dispatch is made available by redux-thunk
// 	//this is the asynchronous code
// 	return dispatch =>{
		
// 			//...
// 			dispatch(authStart());

// 			const authData = {

// 				email:email,
// 				password:password,
// 				returnSecureToken:true
// 			}

// 				//default is the signUp URL
// 			let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAZJdyt7vrJBbwN_yY4W_nQJCYCTFhqZ4U";




// 			if(!isSignup){

// 				//this is the verifyPassword URL
// 				url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAZJdyt7vrJBbwN_yY4W_nQJCYCTFhqZ4U";
// 			}


// 			axios.post(url, authData)
// 				.then(response =>{
// 					console.log(response);

// 						//getTime() converts the date to milliseconds. Multiplying expiresIn by 1000 also converts that value to milliseconds.  This allows them to be added together.  This will be a value one hour in the future from the time of login
// 					const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

// 					localStorage.setItem("token", response.data.idToken);
// 					localStorage.setItem("expirationDate", expirationDate);
// 					localStorage.setItem("userId", response.data.localId);



// 					dispatch(authSuccess(response.data.idToken, response.data.localId));
// 					dispatch(checkAuthTimeout(response.data.expiresIn));
					
// 					//this sets the app to logout after one hour
// 				})
// 				.catch(error =>{
// 					console.log(error);
// 					dispatch(authFail(error.response.data.error));
// 				})


// 				// authRef.signInWithPopup(provider).then(response=>{
// 				// 	console.log(response);
// 				// }).catch(err=>{
// 				// 	console.log(err);
// 				// })


// 		}


// }


export const setAuthRedirectPath = (path) => {

	
	return {
		type:actionTypes.SET_AUTH_REDIRECT_PATH,
		path:path
	}

}

// export const setRefreshPath = (path) => {

	
	

// 	return {
// 		type:actionTypes.SET_AUTH_REFRESH_PATH,
// 		path:path
// 	}

// }

export const AuthCheckState = () =>{

	return dispatch => {

	const token = localStorage.getItem("token");
	

	if(!token){

		dispatch(logout());


	} else{
		const userId = localStorage.getItem("userId");

		//localStorage.getItem("expirationDate") will return a string. passing it as an argument will return a new Date object

		const expirationDate = new Date(localStorage.getItem("expirationDate"));

		if(expirationDate > new Date()){

			//if the expirationDate is greater than the new Date() at the time this code is run,
			//it means we are logged in


			console.log(expirationDate.getTime() - new Date().getTime());
			console.log("AuthCheckState if(expdate > new Date)")
			dispatch(authSuccess(token, userId));
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));

		} else{

			//if the expirationDate is less than the new Date() at the time this code is run
			//it means the app should log out as we are only supposed to be logged in for one hour

			dispatch(logout());

		}

		

	}

}


}

