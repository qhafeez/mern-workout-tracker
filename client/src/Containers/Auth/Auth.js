import React, { Component } from "react";

import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.module.css"; 
import * as actions from "../../store/actions/index";

import { connect } from "react-redux";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import axiosInstance from "axios";
import Spinner from  "../../Components/UI/Spinner/Spinner";
import appScreenshot from "../../Assets/Images/appScreenshot.png"

import { Redirect } from "react-router-dom";



class Auth extends Component {


	componentDidMount(){
		console.log("[auth cdm]")
		if(this.props.isAuthenticated){


			

			// console.log(this.props);
			//this sets the redirect path in the state to the homepage because
			//at the bottom of this file we pass "/" as the argument to the function
			
			

		}
		
	}

	state = {

		controls: {

			email:{

					elementType: "input",
					elementConfig: {
						type:"email",
						placeholder: "Email Address"
					},
					value: "",
					validation:{
						required:true,
						isEmail:true
						
					},
					valid:false,
					touched:false
					

				},
				password:{

					elementType: "input",
					elementConfig: {
						type:"password",
						placeholder: "Password"
					},
					value: "",
					validation:{
						required:true,
						minLength:6
						
					},
					valid:false,
					touched:false
					

				},
				


		},
		isSignUp:true
		
		


	}


	checkValidity(value, rules){

					//value is the value property in the orderForm object
					//rules is the validation property (which is an object) in each orderForm object

		let isValid = true;

		if (rules.required){
			console.log("first if");
			isValid = value.trim() !== "" && isValid;
			

		}

		if (rules.minLength){
			console.log("second if");
			isValid = value.length >= rules.minLength  && isValid ;
			
		}

		if( rules.maxLength){
			console.log("third if");
			isValid = value.length <= rules.maxLength  && isValid ;
			
		}

		 if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

         if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }


		return isValid;

	}

	inputChangeHandler = (event, controlName) => {




		const updatedControls = {



		//this copies the controls object
		//from our state
			...this.state.controls,

		//this creates and object that will
		//update the object within our controls object
			[controlName]:{
				...this.state.controls[controlName],
				value: event.target.value,
				valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched:true
			}
			
		}

		this.setState({
			controls:updatedControls
		})


	}

	submitHandler = (event) =>{
		event.preventDefault();
		
		axiosInstance.get("/google").then(response=>{
			console.log(response);
		}).catch(err=>{
			console.log(err);
		})


	}

	switchAuthModeHandler = () =>{

		this.setState(prevState =>{
			return{

				isSignUp: !prevState.isSignUp
			}
		});
		console.log(this.state.isSignUp)
	}

	
	

	render(){



		const formElementsArray =[];
			for (let key in this.state.controls){

				formElementsArray.push({
					id:key,
					config: this.state.controls[key]
				});

			}

			let form = formElementsArray.map(formElement => {

				return <Input 

					key={formElement.id}
					elementType={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig} 
					value={formElement.config.value} 
					changed={(event)=>this.inputChangeHandler(event, formElement.id)} 
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					style={{borderTop:"none", borderRight:"none", borderLeft:"none", borderBottom:"3px solid #2C74B7"}}	

				/>

			});

			if(this.props.loading){

				form = <Spinner />;

			}

			let errorMessage = null;

			if(this.props.error){

				errorMessage = (
									//the error property is an object returned from
									//firebase. message is one of it's properties
									<p>{this.props.error.message}</p>
								)

			}

			let authRedirect = null;

			if(this.props.isAuthenticated){
				//redirect to home page after successful redirect

				

					authRedirect = <Redirect to="/home" />
						
						if(this.props.refreshPath !== "/home"){

							// authRedirect= <Redirect to={this.props.refreshPath} />;
						}
				
			}
			//this was inside the classes.auth div
			// {authRedirect}							
			// 				{errorMessage}
			// 			<form >
			// 					{form}
			// 				<Button style={{margin:"0px"}} btnType="Success">Submit</Button>
			// 			</form>	
			// 				<Button style={{margin:"0px"}} btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? "Sign In" : "SIGN UP"}</Button>
		


		return(

				<div className={classes.homepageContainer}>
					<div className={classes.Auth}>
					
						
							<a href="/google">GOOGLE</a>
							
					</div>
					<div className={classes.appInfoContainer}>

								<div className={classes.heading}>
									Workout Tracker
								</div>
								<div>
									<img src={appScreenshot} />
								</div>
								<div>
									<ul>
										<li>Track your workouts!</li>
										<li>Keep track of sets and reps!</li>
										<li>Write notes about your workout! "Too easy, up the weight next time"</li>
										<li>Look back at your history and see how far you've progressed!</li>


									</ul>


								</div>

						
						
					</div>

				</div>

			);

	}

}

const mapStateToProps = state =>{

	return{

		loading:state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token,
		// building: state.burgerBuilder.building,
		authRedirectPath:state.auth.authRedirectPath,
		refreshPath:state.auth.authRefreshPath


	}


}
	
const mapDispatchToProps = dispatch =>{

	return {

		onAuth: (token) => dispatch(actions.auth(token)),
		redirect: () => dispatch(actions.setAuthRedirectPath("/home"))
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);