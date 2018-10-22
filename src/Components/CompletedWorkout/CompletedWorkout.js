import React, {Component} from "react";
import CompletedExercise from "./CompletedExercise/CompletedExercise";
import classes from "./CompletedWorkout.module.css";
import firebase from "../../fire.js";



class CompletedWorkout extends Component{


state={

	show:false

}

openClose = () =>{


	this.setState(prevState=>({

		show:!prevState.show

	}));


}

closeWorkout = ()=>{

	this.setState({
		show:false
	})
}



	render(){



	const workout = Object.keys(this.props.workout).map(exer =>{
		return <CompletedExercise key={this.props.workout[exer].key} exercise={this.props.workout[exer].exercise} weight={this.props.workout[exer].weight}  sets={this.props.workout[exer].sets} path={this.props.path} />
		

	})


	return(

			<div className={classes.completedWorkoutContainer}>
			<div onClick={this.openClose} className={classes.dateContainer}>
				<div >{this.props.month}/{this.props.day}/{this.props.year}</div>
			</div>
				<div style={this.state.show ? {display:"block"}:{display:"none"}}  >
							
					{workout}
				
					<div onClick={this.props.clicked} style={{display:"flex", justifyContent:"center", padding:"20px"}}>DELETE</div>

				</div>
				
			</div>

			



		)

}



}

export default CompletedWorkout;