import React, { Component } from "react";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "../../../HOC/Aux/Aux";

class Logout extends Component {

	//this is the component that is accessed by the logout navigationItem
	//as soon as it mounts, the logout() action is dispatched.  This sets the token
	//and userId values to null.  also, as soon as it mounts, the user is redirected to the 
	//root page by the Redirect component

	componentDidMount(){

		this.props.onLogout();
		this.props.redirect()

	}


	render(){

		return (

				<div>logout</div>

			);

	}


}

const mapDispatchToProps = dispatch =>{

	return {
		onLogout: () => dispatch(actions.logout()),
		redirect:()=>dispatch(actions.setAuthRedirectPath("/"))
	};

}

export default connect(null, mapDispatchToProps)(Logout);