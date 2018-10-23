import React, {Component} from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

// import {NavLink} from "react-router-dom";



class NavigationItems extends Component  {


	


	render(){
		console.log(this.props)

		return(
			<ul className={classes.NavigationItems}>

				{
					this.props.isAuthenticated ? <NavigationItem link="/home">Workout Tracker</NavigationItem> : 
					<NavigationItem link="/">Workout Tracker</NavigationItem>
				}
							
				{
					this.props.isAuthenticated ? <NavigationItem link="/history">Workout History</NavigationItem>:null
				}
				
				{ 
					this.props.isAuthenticated ?<NavigationItem link="/logout">Logout</NavigationItem>:null
				}



				
				
			</ul>
		)

	}

}



export default NavigationItems;