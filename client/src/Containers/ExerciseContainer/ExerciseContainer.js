import React, { Component } from "react";
import classes from "./ExerciseContainer.module.css";
import SetComponent from "../../Components/SetComponent/SetComponent";
import {connect} from "react-redux";
// import firebase from "../../fire.js";
import * as actions from "../../store/actions/index.js";

class ExerciseContainer extends Component {




state={

	sets:this.props.sets,
	repsPerSet:this.props.reps,
	exId:this.props.exId,
	path:this.props.path,
	display:false


}



componentDidMount(){


	let currentExercise = this.props.currentWorkout.workout[this.props.index];
	let completedSets = currentExercise.sets.filter(set=>{
			return set.completed === 1;
		}).length;

	if(completedSets === currentExercise.sets.length){
		this.setState({
			display:true
		});
	}

}



removeCompletedDisplay=()=>{

	this.setState({
		display:false
	})

}

clicked=(setId)=>{
	//this will be the function that increases the rep by one
	// console.log(this.props.workoutId);
	this.props.repHandler(setId, this.props.token, this.props.workoutId);

	//this delay was added to make sure the completed sets variable contains the most current 
	//data.  without it, it will execute before the rephandler method finishes.
		setTimeout(()=>{

					let currentExercise = this.props.currentWorkout.workout[this.props.index];
			let completedSets = currentExercise.sets.filter(set=>{
					return set.completed === 1;
				}).length;

			if(completedSets === currentExercise.sets.length){

				if(this.setTimeoutId){
					
					clearTimeout(this.setTimeoutId);
					console.log("if " + this.setTimeoutId);
				}
				this.setTimeoutId =	setTimeout(()=>{
					this.setState({
					display:true
				});	
				}, 500)
				console.log("if " + this.setTimeoutId);


		}},200)
		
	


	

	

}



render(){






		//the index prop allows us to access the specific exercise in tthe array of 
		//exercises		
	let currentExercise = this.props.currentWorkout.workout[this.props.index];

	let setComponents = Object.keys(currentExercise.sets).map(set=>{

		console.log(this.props.sets[set]);
	
		return <SetComponent 
					key={set.setId}
					repsPerSet={currentExercise.maxReps} 
					repsCompleted={this.props.sets[set].reps} 
					exerciseId={currentExercise.exerciseId} 
					setId={this.props.sets[set].setId}
					setCompleted={this.props.sets[set].completed} 
					index={this.props.index}
					clicked={()=>{this.clicked(this.props.sets[set].setId) }}
					/>



	})

	let setContainerClasses = [classes.setsContainer];

	switch(Number(this.props.numberOfSets)){

		case(1):
			setContainerClasses.push(classes.oneSet);
			break;
		
		case(2):
			setContainerClasses.push(classes.twoSet);
			break;
		
		case(3):
			setContainerClasses.push(classes.threeSet);
			break;
		
		case(4):
			setContainerClasses.push(classes.fourSet);
			break;

		case(5):
			setContainerClasses.push(classes.fiveSet);
			break;

		default:
			break;


	}



	return(

				<div className={classes.individualExerciseContainer}>

							<div>
								<div className={classes.exerInfoContainer}>
									<div>{this.props.exerciseName}</div>
										<div className={classes.setsWeightContainer}>
											<div className={classes.setsRepsContainer}>{this.props.numberOfSets} x {this.props.reps}</div>
											<div>{this.props.weight} lbs</div>
									</div>
								</div>
								<div className={classes.setSection} >
									<div className={setContainerClasses.join(" ") /*flex-direction row*/}>


												{setComponents}								
										
										
										

									</div>
								</div>
							</div>
							<div onClick={this.removeCompletedDisplay} className={classes.completedSet} style={this.state.display ? {
								display:"flex",
								justifyContent:"center"
							}:null}>
								<div className={classes.completedSetInner}>
									Completed {this.props.exerciseName}
								</div>
							</div>
							
							
						</div>

		)

}


}

const mapStateToProps = state =>{

	return{
		workoutId:state.workout.currentWorkout.workoutId,
		token:state.auth.token,
		currentWorkout:state.workout.currentWorkout

	}


}

const mapDispatchToProps = dispatch =>{
	
	return {

		repHandler:(setId, token, workoutId)=>{dispatch(actions.repHandler(setId, token, workoutId))}

	}

}

export default connect(mapStateToProps,mapDispatchToProps)(ExerciseContainer);