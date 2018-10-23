import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import Aux from "../Aux/Aux";
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
import HeadRoom from "react-headroom";
// import BurgerBuilder from "../../Containers/BurgerBuilder/BurgerBuilder";
import { connect } from "react-redux";



class Layout extends Component {

	state = {

		showSideDrawer: false

	}

	sideDrawerClosedHandler = () =>{

		this.setState({showSideDrawer: false});

	}

	sideDrawerToggleHandler = () => {

		this.setState( (prevState) => {
			
			return {showSideDrawer: !prevState.showSideDrawer};

		} );
		

	}

	/*
	Toolbar and SideDrawer Components display Navigation Items
	We will pass them the authentication state so the logic inside the navigation Items component
	can decide whether to render the logout navigation item or not
	*/

	render() {

		return( 
			<Aux>

				<HeadRoom>
					<Toolbar isAuth={this.props.isAuthenticated}  openMethod={this.sideDrawerToggleHandler} />
				</HeadRoom>
				<SideDrawer isAuth={this.props.isAuthenticated}  show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					
					{this.props.children}

				</main>
				
			</Aux>
			)
}

}

const mapStateToProps = state =>{

	return{

		// loading:state.auth.loading,
		// error: state.auth.error,
		isAuthenticated: state.auth.token,
		// building: state.burgerBuilder.building,
		// authRedirectPath:state.auth.authRedirectPath


	}
}




export default connect(mapStateToProps)(Layout);