import React, { Component } from "react";
import classes from "./WorkoutSelector.module.css";
import axios from "../../axios-db";
import {connect} from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Input from "../../Components/UI/Input/Input";
import SelectedExercisesTable from "../../Components/SelectedExercisesTable/SelectedExercisesTable";
import SelectedExerciseRow from "../../Components/SelectedExercisesTable/SelectedExerciseRow/SelectedExerciseRow";
import Button from "../../Components/UI/Button/Button";
import Random from "random-id";
import {withRouter, Redirect} from "react-router-dom";
import * as actions from "../../store/actions/index";

import firebase, { auth, provider } from '../../fire.js';


class WorkoutSelector extends Component {

	
	

	componentWillMount(){
		console.log("cwm");
		


		

	}

	componentDidMount(){

		
	}

	// state={



	// 	exerciseList:{
	// 			bench:"Bench Press",
	// 			squat:"Squat",
	// 			deadlift:"Deadlift",
	// 			pullUp: "Pull Up",
	// 			row: "Row",
	// 			ohp:"Overhead Press",
	// 			curl:"Bicep Curl",
	// 			facePull:"Face Pull",
	// 			trExtension:"Tricep Extension"
	// 		},


	// 	workout:{
	// 		workoutID:null,
	// 		exercises:[
	// 			{ 	idNumber:"fhadklfjahsl",//id generated at submission
	// 				exercise:"bench",
	// 				weight:125,
	// 				sets:5,
	// 				reps:12
	// 			}
	// 			]

	// 		}

		state = {

			exerForm:{
				exercise:{
					label:"Select Exercise",
					elementType: "select",
					elementConfig: {
						options:[

							{value:"Bench Press", displayValue:"Bench Press"},
							{value:"Incline Bench Press", displayValue:"Incline Bench Press"},
							{value:"Squat", displayValue:"Squat"},
							{value:"RDL", displayValue:"RDL"},
							{value:"Hip Thrust", displayValue:"Hip Thrust"},
							{value:"Split Squat", displayValue:"Split Squat"},
							{value:"Lat Pulldown", displayValue:"Lat Pulldown"},
							{value:"Pull Up", displayValue:"Pull Up"},
							{value:"Row", displayValue:"Row"},
							{value:"Overhead Press", displayValue:"Overhead Press"},
							{value:"Bicep Curl", displayValue:"Bicep Curl"},
							{value:"Face Pull", displayValue:"Face Pull"},
							{value:"Tricep Extension", displayValue:"Tricep Extension"}


						]
					},
					value: "Bench Press",
					validation:{
						
						
					},
					valid:true,
					touched:false
					

				}, 


				
				weight: {
					label:"Enter Weight (lbs)",
					elementType: "input",
					elementConfig: {
						type:"tel",
						placeholder: "Weight"
					},
					value: "",
					validation:{
						required:true,
						
						
					},
					valid:true,
					touched:false
					

				},
				
				numberOfSets: {

					label:"Select Number Of Sets",
					elementType: "select",
					elementConfig: {
						options: [
			
							{value: 1, displayValue: 1},
							{value: 2, displayValue: 2},
							{value: 3, displayValue: 3},
							{value: 4, displayValue: 4},
							{value: 5, displayValue: 5},
																					
						]
					},
					value: 1,
					validation:{},
					valid:true

				},
				numberOfReps: {

					label:"Select Number Of Reps",
					elementType: "select",
					elementConfig: {
						options: [
			
							{value: 1, displayValue: 1},
							{value: 2, displayValue: 2},
							{value: 3, displayValue: 3},
							{value: 4, displayValue: 4},
							{value: 5, displayValue: 5},
							{value: 6, displayValue: 6},
							{value: 7, displayValue: 7},
							{value: 8, displayValue: 8},
							{value: 9, displayValue: 9},
							{value: 10, displayValue: 10},
							{value: 11, displayValue: 11},
							{value: 12, displayValue: 12},
							{value: 13, displayValue: 13},
							{value: 14, displayValue: 14},
							{value: 15, displayValue: 15},
							{value: 16, displayValue: 16},
							{value: 17, displayValue: 17},
							{value: 18, displayValue: 18},
							{value: 19, displayValue: 19},
							{value: 20, displayValue: 20}
														
						]
					},
					value: 1,
					validation:{},
					valid:true

				}
			},

			formIsValid:false,

			workout:[]
			
		

	}



checkValidity(value, rules){

					//value is the value property in the orderForm object
					//rules is the validation property (which is an object) in each orderForm object

		let isValid = true;

		console.log("[ value before check "+value+" ]");

		if (rules.required){

			console.log("first if");
			isValid = value.trim() !== "" && isValid;
			

		}

		console.log("[ value after check "+value+" ]");

		console.log(isValid);

		// if (rules.minLength){
		// 	console.log("second if");
		// 	isValid = value.length >= rules.minLength  && isValid ;
			
		// }

		// if( rules.maxLength){
		// 	console.log("third if");
		// 	isValid = value.length <= rules.maxLength  && isValid ;
			
		// }

		//  if (rules.isEmail) {
  //           const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //           isValid = pattern.test(value) && isValid
  //       }

  //        if (rules.isNumeric) {
  //           const pattern = /^\d+$/;
  //           isValid = pattern.test(value) && isValid
  //       }


		return isValid;

	}


	inputChangeHandler = (event, inputIdentifier) => {

			console.log(inputIdentifier);

			const updatedExerForm= {
				...this.state.exerForm
			}


			const updatedFormElement = {
				...updatedExerForm[inputIdentifier]
			}

			updatedFormElement.value=event.target.value;
			updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

			console.log(updatedFormElement.value);
			updatedFormElement.touched=true;

			let formIsValid = true;
			updatedExerForm[inputIdentifier] = updatedFormElement;
			for(let inputIdentifier in updatedExerForm){

				
				formIsValid = updatedExerForm[inputIdentifier].valid && formIsValid;
				console.log(inputIdentifier + " " + updatedExerForm[inputIdentifier].valid );
				console.log(formIsValid);
			}
			console.log(formIsValid);

			
			console.log(updatedFormElement);
			


			this.setState({
				exerForm: updatedExerForm,
				formIsValid:formIsValid

			});

	}



		
	


	exerciseAddHandler = (event) =>{
		event.preventDefault();

		const formData = {};

		//adds a unique ID for the exercise
		formData.exerciseID = Random();


			for ( let formElementIdentifier in this.state.exerForm){

				formData[formElementIdentifier] = this.state.exerForm[formElementIdentifier].value;

		}

		console.log(formData);
		
		const sets={};
		
		for(let i=0; i < Number(formData.numberOfSets); i++){

			//adds a unique ID to the set withing the exercise
			let id = Random();
			sets[id]={reps:0}
			

		}

		formData.sets = sets;

		let exObj = {
			workoutId:this.props.currentWorkout.workoutId,
			numSets:this.state.exerForm.numberOfSets.value,
			maxReps:this.state.exerForm.numberOfReps.value,
			exerciseName:this.state.exerForm.exercise.value,
			weight:this.state.exerForm.weight.value
		}

	

		this.props.addExeciseHandler(this.props.token, exObj);
		this.resetValuesAfterAdd();


	}

	resetValuesAfterAdd = () =>{

		const resetForm = {
			...this.state.exerForm
		}

		resetForm.exercise.value="Bench Press";
		resetForm.weight.value="";
		resetForm.numberOfSets.value=1;
		resetForm.numberOfReps.value=1;

		this.setState({

			exerForm: resetForm,
			//this value is set to false as it will automatically become false when
			//the weight value is set to ""
			formIsValid: false

		})



	}

	deleteExercise = (event) =>{
		const id = event.currentTarget.dataset.id;

		const workoutCopy = [...this.state.workout];
		const editedWorkoutCopy = workoutCopy.filter(exer=>{

			return exer.exerciseID !== id;

		})

		this.setState({

			workout:editedWorkoutCopy

		})



	}

	// workoutSubmit = () =>{
	// 	let token = this.props.token;
	// 	let date = new Date();
	// 	let currentDate = {
	// 		month:date.getMonth() + 1,
	// 		date:date.getDate(),
	// 		year:date.getFullYear(),
	// 		timestamp:date.getTime()
	// 	}

		
		
			
		
	// 	const itemsRef = firebase.database().ref("currentWorkouts/"+this.props.path+"/workout");
		
	// 	console.log(itemsRef);                    

	// 	const data = {
	// 		userId: this.props.userId,
	// 		workout:this.state.workout,
	// 		notes:"",
	// 		date:currentDate,
			
			


	// 	}


	// 	itemsRef.push(data);


		

	// }






	render(){

		// let redirect = null;

		// if(this.props.workoutInProgress){
		// 	redirect = <Redirect to="/workout" />
		// }

		console.log("render");

		let workoutStuff=null;
		if(this.props.loading){
			workoutStuff = <Spinner style={{margin:0, height:"15px", width:"15px", fontSize:"5px"}}/>;
		}

		if(this.props.successMessage){
			workoutStuff = this.props.successMessage;
		}

			const formElementsArray =[];

			for(let key in this.state.exerForm){


				formElementsArray.push({

					id: key,
					config: this.state.exerForm[key]

				})	
				

			}


			let form = (<form  onSubmit={this.exerciseAddHandler}>
					{
						formElementsArray.map(formElement =>{

							return (<div className={classes.individualContainer}>
										<div>{formElement.config.label}</div>
										<Input key={formElement.id} 
											
										  elementType={formElement.config.elementType} 
										  elementConfig={formElement.config.elementConfig} 
										  value={formElement.config.value} 
									      changed={(event)=>this.inputChangeHandler(event, formElement.id)} 
										  invalid={!formElement.config.valid}
										  shouldValidate={formElement.config.validation}
										  touched={formElement.config.touched}/>
								</div>)
																					
					})
				}
						
						<div className={classes.addingContainer}>
							<Button  btnType="Success" disabled={!this.state.formIsValid}>Add Exercise</Button>
							<div>
								{workoutStuff}
							</div>
						</div>
					
					</form>

				);

			// let addedExercises = this.state.workout.map(item=>{



			// 		return <SelectedExerciseRow key={item.exerciseID} id={item.exerciseID} exercise={item.exercise} weight={item.weight} sets={item.numberOfSets} reps={item.numberOfReps} deleteHandler={(event)=>{this.deleteExercise(event)}} />

			// })



			// const exerList = Object.keys(this.state.exerForm.exercise).map(ex=>{
			// 	return <option key={ex} value={ex}>{this.state.exerciseList[ex]}</option>
			// })


				//this was used when the workout selector was separate from the workout page
				// <SelectedExercisesTable>
								
				// 			{addedExercises}

					// 		</SelectedExercisesTable>
					//<Button btnType="Success" disabled={this.state.workout.length === 0} clicked={this.workoutSubmit}>Start Workout</Button>	
					//{redirect}

		return(


					<div className={classes.selectorContainer}>
						
						<div style={{textAlign:"center"}}>Choose Exercise</div>

						{form}
						<div style={{display:"flex", justifyContent:"center"}}>
						
						</div>

					</div>

			)

	}

}

const mapStateToProps = state =>{

	return{

		userId:state.auth.userId,
		token:state.auth.token,
		currentWorkout:state.workout.currentWorkout,
		workoutInProgress:state.workout.inProgress,
		workout:state.workout,
		loading:state.workout.workoutAddProcessing,
		successMessage:state.workout.workoutAddMessage

	}

}

const mapDispatchToProps = dispatch =>{
	return{
		addExeciseHandler:(token, exObj)=>{dispatch(actions.addExercise(token, exObj))}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutSelector));