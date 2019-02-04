import React, { Component} from "react";
import classes from "./SetComponent.module.css";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index.js"; 



class SetComponent extends Component{


// state={

// 	maxReps:Number(this.props.repsPerSet),
// 	repsCompleted:this.props.repsCompleted.reps,
// 	setId:this.props.setId,
// 	exId:this.props.exId,
	


// }



// componentDidUpdate(prevProps, prevState){

// 	if(prevProps.repsCompleted.reps !== this.props.repsCompleted.reps){

// 			this.setState({

// 				repsCompleted:this.props.repsCompleted.reps

// 			})

// 	}


// }





repInc = (maxReps, repsCompleted, setId) =>{

	// //if the reps are equal to zero, set reps to the max number of reps
	// //else decrease the current number of reps by one
	// //

	// console.log(maxReps, repsCompleted, setId);
	// let completedReps = null;

	// if(repsCompleted === 0){


	// 	completedReps = maxReps;

	// } else{
	// 	completedReps = repsCompleted - 1;
	// }

	// // this.setState({
	// // 	repsCompleted: completedReps
	// // });
console.log(this.props)

	

	// const query = firebase.database().ref("currentWorkouts").orderByChild("userId").equalTo(this.props.userId);

			

	// 	  const workoutKey = this.props.workoutKey;

	// 	 //  // console.log(firebase.database().ref(""))


	// 	  const updatePath = "currentWorkouts/" + workoutKey + "/workout/" + this.props.path + "/sets/"+this.props.setId +"/reps";

	// 	  const update ={

	// 	  				[updatePath] : completedReps

	// 	  }

	// 	  console.log(update);

	// 	  // this.props.repHandle(update);

	// 	  // console.log(maxReps);

	// 	  firebase.database().ref().update(update);

		  



}



render(){

	// console.log(typeof(this.state.repsCompleted));

	return(

			<div onClick={this.props.clicked} className={classes.set}>
				

					<div className={classes.rep}>{this.props.repsCompleted}</div>
				
				</div>


		)
}

}


const mapStateToProps = state =>{

	return{
		workoutKey:state.workout.currentWorkout.key,
		userId: state.auth.userId,


	}

}

const mapDispatchToProps = dispatch =>{

	return{

		repHandle: (repObj)=>{dispatch(actions.repHandler(repObj))}

	}

}



export default connect(mapStateToProps, mapDispatchToProps)(SetComponent); 