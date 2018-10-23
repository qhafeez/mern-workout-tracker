import React from "react";

import barbellLogo from '../../Assets/Images/barbell.png';

import classes from  './Logo.module.css';

const logo = (props) => (

	<div className={classes.Logo}>
		<img src={barbellLogo} alt="MyBurgerLogo" />		
	</div>

)

export default logo;