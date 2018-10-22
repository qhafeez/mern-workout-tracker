import React from "react";

const selectedExerciseRow = (props) =>{

	let deleteButton=null;
	if(props.deleteHandler){

		deleteButton = <td style={{textAlign:"center", color:"red", cursor:"pointer"}} data-id={props.id} onClick={props.deleteHandler} >DELETE</td>;

	}


return(
			
			<tr>
				<td style={{textAlign:"center"}}>{props.exercise}</td>
				<td style={{textAlign:"center"}}>{props.weight}</td>
				<td style={{textAlign:"center"}}>{props.sets} x {props.reps}</td>

				{deleteButton}
				
			</tr>
			


	)



}

export default selectedExerciseRow;