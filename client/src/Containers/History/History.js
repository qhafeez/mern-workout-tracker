import React, { Component } from "react";
import {connect} from "react-redux";
import classes from "./History.module.css";
import Spinner from  "../../Components/UI/Spinner/Spinner";
import CompletedWorkout from  "../../Components/CompletedWorkout/CompletedWorkout";
// import logic from "jw-paginate";
import Pagination from "jw-react-pagination";
import * as actions from "../../store/actions/index.js";
import Aux from "../../HOC/Aux/Aux";

import firebase from "../../fire.js";

class History extends Component {

componentDidMount(){

	this.props.fetchHistory(this.props.token);

}


componentDidUpdate(prevProps, prevState){

	console.log("HISTORY CDU")
	if(this.props.completedWorkouts !== null){

		if(prevState.completedWorkouts !== this.props.completedWorkouts){



			console.log("HISTORY CDU ONE")

				this.setState({
					completedWorkouts:this.props.completedWorkouts
				})
			
		}
	}

// 	if(this.props.completedWorkouts !== null){

// 	if(prevProps.completedWorkouts !== this.props.completedWorkouts)
// this.setState({
// 	completedWorkouts:this.props.completedWorkouts
// })

// }

}



state={

	completedWorkouts:null,
	pageOfItems:[]

}



onChangePage = (pageOfItems) =>{

	this.setState({

		pageOfItems:pageOfItems
		

	})


}

deleteWorkout=(workoutId)=>{

	this.props.deleteWorkout(workoutId, this.props.token)

}







render(){


		let currentWorkouts = <Spinner />;
		if(this.props.completedWorkouts !== null ){





		

		if(this.state.completedWorkouts){




			currentWorkouts = this.state.pageOfItems.map(exerList =>{

				



				return <CompletedWorkout month={exerList.date.month} 
										 day={exerList.date.day} 
										 year={exerList.date.year}  
										 workout={exerList.workout}
										 path={exerList.key}
										 workoutId={exerList.workoutId}
										 clicked={()=>{this.deleteWorkout(exerList.workoutId)}} 
										 />
		
					// Object.keys(exerList.workout).map(indExer=>{

					// 	return <div>exerList.workout[indExer].exercise</div>

					// })




			});




		}
	} else {
		currentWorkouts = "You have no completed workouts";
	}


console.log(this.props.completedWorkouts);

	return(
			<Aux>
				<div className={classes.mainContainer}>
					<div className={classes.historyContainer}>
						<div className={classes.title}>
								<div>Workout History</div>
								<div>Tap to reveal</div>
						</div>

						{currentWorkouts}

						
					  
					</div>
					<div className={classes.paginationContainer}>
						<Pagination items={this.state.completedWorkouts} onChangePage={this.onChangePage} pageSize={5} />
					</div>
				</div>
			</Aux>
		)


}




}


const mapStateToProps = state =>{

	return{
		token:state.auth.token,
		completedWorkouts:state.workout.workoutHistory,
		userId: state.auth.userId

	}

}

const mapDispatchToProps = dispatch =>{

	return{

		fetchHistory:(token)=>{dispatch(actions.fetchWorkoutHistory(token))},
		deleteWorkout:(workoutId,token)=>{dispatch(actions.deleteWorkout(workoutId,token))}

	}

}



export default connect(mapStateToProps, mapDispatchToProps)(History);