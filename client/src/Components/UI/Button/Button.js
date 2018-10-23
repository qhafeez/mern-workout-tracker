import React from "react";
import classes from "./Button.module.css"

const button = (props) => {

	// let style=null;
	// if(props.padding){

	// 	style={
	// 		padding:props.padding
	// 	}

	// }


	return(

			<button 
				style={props.style}
				disabled={props.disabled}
				className={[classes.Button, classes[props.btnType]].join(" ")}
				onClick={props.clicked}>{props.children}</button>

		)

}

export default button;