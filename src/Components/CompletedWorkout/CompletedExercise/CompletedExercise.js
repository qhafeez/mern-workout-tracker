import React from "react";
import classes from "./CompletedExercise.module.css";

const completedExercise = (props) =>{

	// console.log(props.exercise)

	let workout = Object.keys(props.sets).map((set, index, array) =>{
					

				if(index === array.length-1){
					return <div style={{padding:"5px", fontSize:"20px"}} >{props.sets[set].reps}</div>;
				} else{

					return <div style={{padding:"5px", fontSize:"20px"}} >{props.sets[set].reps} / </div>;

				}

	})



	return(
		<div className={classes.indExerContainer}>
			<div className={classes.exerInfoContainer}>
				<div >{props.exercise}</div>
				<div>{props.weight} lbs</div>
			</div>
			<div className={classes.aaa}>
			{workout}	
			</div>
		</div>

		)


}

export default completedExercise;
