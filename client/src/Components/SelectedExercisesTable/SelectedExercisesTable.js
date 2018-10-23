import React from "react";

const selectedExercisesTable = (props) =>{

	let title=null;

	if(props.title){

		title = <div>{props.title}</div>

	}


return(
			

			<div>
				{title}
			<table>
			<thead>
				<tr>
					<th>Exercise</th>
					<th>Weight</th>
					<th>Sets X Reps</th>
				</tr>
			</thead>
			<tbody>
				{props.children}
			</tbody>

			</table>
			</div>


	)



}

export default selectedExercisesTable;