import React from "react";

import classes from "./Input.module.css";

const input = (props) => {

	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched){
	
		inputClasses.push(classes.Invalid);
	}


	switch(props.elementType){

		case ( "input" ):
			inputElement = <input onChange={props.changed} className={inputClasses.join(" ")} {...props.elementConfig} style={props.style}  value={props.value} />;
			break;

		case ( "textarea" ):
			inputElement = <textarea onChange={props.changed} className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
			break;

		case ( "select" ):
				console.log("select option chosen");
				
				const selectOptions =(props.elementConfig.options).map(key =>{

					return <option  key={key.value} value={key.value}>{key.displayValue}</option>
				})


				inputElement = <select style={{textAlign:"center"}} onChange={props.changed} value={props.value}  className={inputClasses.join(" ")} >
									{selectOptions}
								</select>;
			break;

		default:
			inputElement = <input onChange={props.changed} className={inputClasses.join(" ")}  {...props.elementConfig}  value={props.value} />

	}



return (

	<div>
		<label>{props.label} </label>
			{inputElement}
	</div>
)

}

export default input;