import React, {Component} from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Aux/Aux";



const withErrorHandler = (WrappedComponent, axios) => {

	return class extends Component { 

		state = {

			error: null,

		}

		componentWillMount(){


			this.requestInterceptor = axios.interceptors.request.use(request => {

				this.setState({error: null});
				return request;

			});


			this.responseInterceptor = axios.interceptors.response.use(res => res, error => {


				console.log(error);
				this.setState({error: error});


			});

		}

		componentWillUnmount(){
			console.log(WrappedComponent.name+ " [Will Unmount] ", this.requestInterceptor, this.responseInterceptor);
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);

		}


		errorConfirmedHandler =() =>{

			this.setState({error:null});
			//setting the error to null will close the modal
			//since the error state gets passed as the prop "show" which
			//then gets passed to the backdrop component where it's true or false
			//value decides whether the backdrop is shown or not

		}

		render(){
			return (

			<Aux>		
				<Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
					{this.state.error ? this.state.error.message :null}
				</Modal>
				<WrappedComponent {...this.props} />
			</Aux>	
				);
		}

	}


}

export default withErrorHandler;