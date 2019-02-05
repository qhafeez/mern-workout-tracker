import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import authReducer from "./store/reducers/auth-reducer";
import workoutReducer from "./store/reducers/workout-reducer";
import thunk from "redux-thunk";
import {BrowserRouter, BrowserHistory} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	
	auth: authReducer,
	workout: workoutReducer
	
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

console.log("process.env.public_url");
console.log(process.env.PUBLIC_URL);

ReactDOM.render(


	<Provider store={store}>
	<BrowserRouter basename={process.env.PUBLIC_URL}>
			<App />
		</BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
