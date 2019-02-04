import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route, NavLink, Link, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "./Containers/Auth/Auth";
import Layout from "./HOC/Layout/Layout";
import Logout from "./Containers/Auth/Logout/Logout";
import Home from "./Containers/Home/Home";
import WorkoutSelector from "./Containers/WorkoutSelector/WorkoutSelector";
import Workout from "./Containers/Workout/Workout";
import History from "./Containers/History/History";
import { connect } from "react-redux";
import * as actions from "./store/actions/index.js";
import axiosInstance from "axios";
import queryString from "query-string";




class App extends Component {

  componentWillMount(){
 
   console.log("[app cwm]")
   // this.props.onTryAutoSignUp();
    
   //  let query = queryString.parse(this.props.location.search);
    
   //  console.log(query);

   //  if (query.token) {
   //    // window.localStorage.setItem("token", query.token);
   //    this.props.onAuth(query.token);
   //    this.props.history.push("/");
   // } 





   

  }



  componentDidMount(){
      console.log("[app cdm] " );
      console.log(document.cookie.session);

       let query = queryString.parse(this.props.location.search);
      
      console.log(query);

      if(query.token){
        // window.localStorage.setItem("token", query.token);
        this.props.onAuth(query.token);
        // this.props.history.push("/");
     } 
     
      if(localStorage.getItem("token")){
        let lsToken = localStorage.getItem("token");
        this.props.onAuth(lsToken);
        this.props.fetchCurrentWorkout(lsToken);
        this.props.fetchWorkoutHistory(lsToken)
     }

      console.log(this.props.isAuthenticated);
     
  
  }

  componentWillUnmount(){

  }

  componentDidUpdate(nextProps, nextState){
    if(nextProps.isAuthenticated ===null && this.props.isAuthenticated === true){
      window.location = "https://workout-tracker-qh.herokuapp.com/";
    }
    console.log(document.cookie);
  }

// componentDidUpdate(prevProps, prevState){
  
//   if(prevProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated === null){

//     this.props.history.push("/");

//   }

// }


  render() {
    
  
         {/* let  routes= <Switch>
          
              <Route path="/logout" render={()=>(
                this.props.isAuthenticated ? (<Logout/>) : (<Redirect to="/"
               />) )}/>
             
              <Route path="/home" render={()=>(
                this.props.isAuthenticated ? (<Home/>) : (<Redirect to="/"
               />) )} />
             
              <Route path="/history" render={()=>(
                this.props.isAuthenticated ? (<History/>) : (<Redirect to="/"
               />) )} />
             
              <Route path="/workoutSelector" render={()=>(
                this.props.isAuthenticated ? (<WorkoutSelector/>) : (<Redirect to="/"
               />) )} />
             
              <Route path="/workout" render={()=>(
                this.props.isAuthenticated ? (<Workout/>) : (<Redirect to="/"
               />) )} />
             
              <Route exact path="/" render={()=>(
                !this.props.isAuthenticated ? (<Auth/>) : (<Redirect to="/home"
               />) )} />

              
          
           </Switch>*/}

           let routes =null;
           if(this.props.isAuthenticated){
            routes = <Switch>
                        <Route path="/logout" component={Logout} />
                        <Route path="/home" component={Home} />
                        <Route path="/history" component={History} />
                        <Route path="/workoutSelector" component={WorkoutSelector} />
                        <Route path="/workout" component={Workout} />
                        <Route component={Home} />


                      </Switch>
           } else{
              routes =<Switch>
                        <Route path="/" component={Auth} />
                        

                      </Switch>
           }
         



    
console.log(routes);


    return (

      <Layout>
        <div>
        
          {routes}
         

        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state =>{

  return {

    isAuthenticated: state.auth.token,
    refreshPath: state.auth.refreshPath

  }

}

const mapDispatchToProps = dispatch =>{

  return {

    cookieCheck: () => dispatch(actions.AuthCheckState()),
    onAuth: (token) => dispatch(actions.auth(token)),
    fetchCurrentWorkout:(token)=>{dispatch(actions.fetchCurrentWorkout(token))},
    // setRefreshPath: (val) => dispatch(actions.setRefreshPath(val))
    fetchWorkoutHistory:(token)=>{dispatch(actions.fetchWorkoutHistory(token))},
    logout:()=>dispatch(actions.logout())


  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
