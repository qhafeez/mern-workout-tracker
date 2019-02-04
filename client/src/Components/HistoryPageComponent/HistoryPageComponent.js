import React, {Component} from "react";
import classes from "./HistoryPageComponent.module.css";


class HistoryPageComponent extends Component{

componentDidMount(){

	console.log("numExercises");
	console.log(this.props.numExercises);

}


render(){

	return(

			<div className={classes.mainContainer}>

					<div>Date: {this.props.month}/ {this.props.day}/ {this.props.year}</div>
					<div> # of Exercises: {this.props.numExercises.length}</div>
				
			</div>

		)

}



} 

export default HistoryPageComponent;