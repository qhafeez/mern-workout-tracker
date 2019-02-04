import React, {Component} from "react";
import CompletedExercise from "./CompletedExercise/CompletedExercise";
import classes from "./CompletedWorkout.module.css";
import * as actions from "../../store/actions/index.js";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";





class CompletedWorkout extends Component{


deleteWorkout = () =>{

	if(window.confirm("Are you sure you want to delete this workout?")){

		// window.alert("ALright!");
		this.props.deleteWorkout(this.props.oneWorkout[0].workoutId, this.props.token);
		this.closeWorkout();
	} else{
		window.alert("OK, workout will not be deleted");
	}


	

}

closeWorkout = ()=>{

	this.props.resetOneWorkoutToNull();
	this.props.history.goBack();
}



	render(){

		console.log(this.props);

	const workout = Object.keys(this.props.workout).map(exer =>{
		return <CompletedExercise key={this.props.workout[exer].key} exercise={this.props.workout[exer].exerciseName} weight={this.props.workout[exer].weight}  sets={this.props.workout[exer].sets} path={this.props.path}  />
		

	})


	return(

			<div className={classes.completedWorkoutContainer}>
			<div className={classes.closeContainer}>
				<div onClick={this.closeWorkout}>
				X</div>
			</div>
			<div onClick={this.openClose} className={classes.dateContainer}>
				<div >{this.props.month}/{this.props.day}/{this.props.year}</div>
			</div>
				<div >
							
					{workout}
					
					<div className={classes.notesContainer}>
						<div className={classes.notesLabel}>Notes</div>
						<div className={classes.notes}>
													
							{this.props.notes}
							
						</div>
					</div>
					<div className={classes.deleteContainer} onClick={this.deleteWorkout} >DELETE</div>

				</div>
				
			</div>

			



		)

}



}

const mapStateToProps = state =>{
	
	return{

		token:state.auth.token,
		oneWorkout: state.workout.oneWorkout

	}

}

const mapDispatchToProps = dispatch =>{

	return{

		deleteWorkout:(workoutId, token)=>{dispatch(actions.deleteWorkout(workoutId, token))},
		resetOneWorkoutToNull:()=>dispatch(actions.resetOneWorkoutToNull())

	}

}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompletedWorkout));