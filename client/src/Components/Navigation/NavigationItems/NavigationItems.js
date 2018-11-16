import React, {Component} from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
// import {NavLink} from "react-router-dom";
import * as actions from "../../../store/actions/index";



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
					this.props.isAuthenticated ?<NavigationItem link="/logoutExp">Log Out</NavigationItem>:null
				}



				
				
			</ul>
		)

	}

}

const MapDispatchToProps = dispatch=>{

	return{
		onLogout: () => dispatch(actions.logout()),
	}

}

export default connect(null,MapDispatchToProps)(NavigationItems);