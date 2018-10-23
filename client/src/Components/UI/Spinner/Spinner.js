import React from "react";
import classes from './Spinner.module.css';


const spinner = (props) =>{

	let style = props.style


	return(

		<div style={style} className={classes.Loader}>Loading...</div>

		);


}

export default spinner;