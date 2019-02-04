import React, {Component} from "react";
import {connect} from "react-redux";
import classes from  './CompletedWorkoutDisplay.module.css';
import * as actions from "../../store/actions/index.js";
import CompletedWorkout from "../CompletedWorkout/CompletedWorkout";
import {Redirect} from "react-router-dom";
import Aux from "../../HOC/Aux/Aux";




class CompletedWorkoutDisplay extends Component {

	
	componentDidMount(){

		let workoutId = Number(this.props.match.params.id);

		console.log(typeof workoutId);

		this.props.fetchOneWorkout(this.props.token, Number(workoutId));

	}

	
	render(){

		let workout = null;
		let notes = null;
		let redirect=null;


		if(this.props.oneWorkout !== null && this.props.oneWorkout === 0){
			this.props.resetOneWorkoutToNull();
			 redirect = <Redirect to="/history" />
		} else if(this.props.oneWorkout !== null && this.props.workout !== 0){

			let oneWorkout = this.props.oneWorkout[0];
			

			workout = <CompletedWorkout 

						month={oneWorkout.date.month} 
						day={oneWorkout.date.day} 
						year={oneWorkout.date.year}  
						workout={oneWorkout.workout}
						// path={oneWorkout.key}
						workoutId={oneWorkout.workoutId}
						notes={oneWorkout.notes}
						// clicked={()=>{this.deleteWorkout(oneWorkout.workoutId)}}

						/>

		} 


		return (
			<Aux>
				<div className={classes.cwd}>
					{redirect}
				</div>
				<div className={classes.workout}>
					{workout}
					
				</div>
			</Aux>
		
		)

	}
	

}

const mapDispatchToProps = dispatch =>{

	return{

		fetchOneWorkout:(token, workoutId)=>{dispatch(actions.fetchOneWorkout(token, workoutId))},
		resetOneWorkoutToNull:()=>dispatch(actions.resetOneWorkoutToNull())

	}

}

const mapStateToProps = state =>{
	
	return{

		token:state.auth.token,
		oneWorkout: state.workout.oneWorkout

	}

}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedWorkoutDisplay);