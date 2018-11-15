import React, { Component } from "react";
import classes from "./Workout.module.css";
import axios from "../../axios-db";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index.js";
import Input from "../../Components/UI/Input/Input";
// import SetComponent from "../../Components/SetComponent/SetComponent";
import ExerciseContainer from "../ExerciseContainer/ExerciseContainer"; 
import Aux from "../../HOC/Aux/Aux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Button from "../../Components/UI/Button/Button";
import Modal from "../../Components/UI/Modal/Modal";
import WorkoutSelector from "../../Containers/WorkoutSelector/WorkoutSelector";
import {Redirect} from "react-router-dom";

import { Icon } from "react-icons-kit";
import {pen_3} from 'react-icons-kit/ikons/pen_3';
import {plus} from 'react-icons-kit/ikons/plus';
import {square_ok} from 'react-icons-kit/ikons/square_ok';
import {arrows_horizontal_2} from 'react-icons-kit/ikons/arrows_horizontal_2';





import {withRouter} from "react-router-dom";
import firebase from '../../fire.js';



class Workout extends Component {




	state={

		
		notes:"",
		notesModalShow:false
		

	}


componentDidMount(){
	
 
	
	if(!this.props.currentWorkout){ 	
	 		
	 		console.log("[Workout  CDM]");

		 	// this.props.getWorkout(this.props.token);
	}

	if(this.props.currentWorkout){

		console.log("workout CDM")
	}


	}

componentDidUpdate(prevProps, prevState){

	if(prevProps.currentWorkout !== this.props.currentWorkout && this.props.currentWorkout === null ){
		this.props.history.push("/home");
	}

}
	


completeWorkout = () =>{

//this sets the currentworkout to null in the reducer
//this triggers the CDU to take us back to the 

this.props.completeWorkout(this.props.currentWorkout.workoutId, this.props.token);

}



notesModalClose = ()=>{

	this.setState(prevState=>({

		notesModalShow:!prevState.notesModalShow
	}));


}

notesModalOpen = ()=>{

	this.setState({

		notesModalShow:true,
		notes:this.props.currentWorkout.notes
	});


}

textHandler =(event)=>{

	this.setState({

		notes:event.target.value
	})



}

textField = () =>{

	// this.setState({

	// 	notes:this.props.currentWorkout.notes

	// })

}

notesUpdateHandler = () =>{


const query = firebase.database().ref("currentWorkouts").orderByChild("userId").equalTo(this.props.userId);

			

		  const workoutKey = this.props.currentWorkout.key;

		 //  // console.log(firebase.database().ref(""))


		  const updatePath = "currentWorkouts/" + workoutKey + "/notes";

		  const update ={

		  				[updatePath] : this.state.notes

		  }

		  this.props.notesUpdate(update);
		  this.notesModalClose();

		  // console.log(maxReps);

		  // firebase.database().ref().update(update);


}


	render(){

	// 		const workout = firebase.database().ref("currentWorkouts/").orderByChild("userId").equalTo(this.props.userId);
	
	// 		let exercises =null;

	// 		workout.on("value", (snapshot) =>{
				
	// 				snapshot.forEach(function(childSnapshot){
						
	// 					 exercises = childSnapshot.val();

	// 					console.log(exercises.workout);


	// 				})	

	// })

		let redirect = null;

		let exercises = <Spinner />;

		if(this.props.currentWorkout !== null){
			console.log(this.props.currentWorkout);
			if(this.props.currentWorkout.workout !== null){
			// text=this.props.currentWorkout.notes;
			console.log(this.props.currentWorkout);
			const date = {
						month:this.props.currentWorkout.date.month,
						day:this.props.currentWorkout.date.day,
						year:this.props.currentWorkout.date.year

			}


			const exerciseList = Object.keys(this.props.currentWorkout.workout).map(exer=>{

						//we are looping through the entire workout
						//the index variable will allow us to access the specific workout
						//in the exercise container component
						let index = exer;
	        			let exercise = this.props.currentWorkout.workout[exer];
	        					console.log(index);
	        			return 	<ExerciseContainer 
	        								key={exercise.exerciseID}
	        							   exerciseName={exercise.exerciseName} 
	        							   weight={exercise.weight} 
	        							   sets={exercise.sets}
	        							   numberOfSets={exercise.numberOfSets} 
	        							   reps={Number(exercise.maxReps)} 
	        							   exercideId={exercise.exerciseId}
	        							   index={index} />
	        })


			
	        exercises =  (

	        	<Aux>
	        		
					<div className={classes.exercisesContainer}>
						<div >{date.month}/ {date.day}/ {date.year}</div>


						<div className={classes.innerExerciseContainer}>
	        				{exerciseList}
	        			</div>

						
					</div>
					
				</Aux>

)

		}

		else{

			this.props.openExerciseModal();



		}


		} else{
			redirect=<Redirect to="/home" />
		}
			

		


		return(
			<Aux>
			<div className={classes.mainContainer}>
			
				<div className={classes.selectorContainer}>
					
						{exercises}

						

							
						<div className={classes.buttonContainer} >
							


							
							<div className={classes.innerContainer}>


									
	        						<Button style={{marginLeft:"10px",padding:"0px"}} clicked={this.props.openExerciseModal}  btnType="Success">Add Exercise</Button>
	        						<Button style={{padding:"0px"}}  clicked={this.notesModalOpen} className={classes.buttonPaddingLeft} btnType="Success">Notes</Button>
	        						<Button style={{padding:"0px"}} clicked={this.completeWorkout} btnType="Success">Complete Workout</Button>
	        						{/*<Icon onClick={this.selectorModalOpen} size={50} icon={plus}/>
	        						<Icon onClick={this.modalOpen} size={50} icon={pen_3}/>
	        						<Icon onClick={this.completeWorkout} size={50} icon={square_ok}/>*/}

	        						
	        					
	        				</div>
	        			</div>

						<Modal show={this.props.exerciseModalShow} modalClosed={this.props.exerciseModalClose} >
								
							<WorkoutSelector  closeModal={this.props.exerciseModalClose} />

						</Modal>

						<Modal show={this.state.notesModalShow} modalClosed={this.notesUpdateHandler}>

							<div className={classes.doneContainer}>
								<div onClick={this.notesUpdateHandler}>DONE</div>

							</div>
						
								<textarea value={this.state.notes} onChange={this.textHandler}></textarea>
							

						</Modal>	
				</div>
				</div>



				
				</Aux>


			)


	}

}

const mapStateToProps = state => {

	return{

		token:state.auth.token,
		currentWorkout:state.workout.currentWorkout,
		path:state.workout.key,
		exerciseModalShow:state.workout.exerciseModalShow,
		notesModalShow:state.workout.notesModalShow,
		// workoutId:state.workout.currentWorkout.workoutId

	}

}

const mapDispatchToProps = dispatch =>{

	return {

		getWorkout: (token) => dispatch(actions.fetchCurrentWorkout(token)),
		notesUpdate:(notes) => dispatch(actions.updateNotes(notes)),
		exerciseModalClose:() => dispatch(actions.exerciseModalClose()),
		notesModalClose:() => dispatch(actions.notesModalClose()),
		openExerciseModal: ()=>{dispatch(actions.exerciseModalShow())},
		openNotesModal:()=>{dispatch(actions.notesModalShow())},
		completeWorkout:(workoutId, token)=>{dispatch(actions.completeWorkout(workoutId,token))}


	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Workout);