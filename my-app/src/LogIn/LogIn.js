import React, { Component } from 'react';
import './LogIn.css';
import firebase from '../firebase.js';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

class LogIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			pwd: "", 
			feature: "SignIn", 
			status: this.props.model.getUserStatus()
		}

		this.props.model.addObserver(this)

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleFeatureChange = this.handleFeatureChange.bind(this);
		this.signIn = this.signIn.bind(this);
		this.signUp = this.signUp.bind(this);
		this.update = this.update.bind(this)
	}

	handleEmailChange(event) {
		this.setState({
			email: event.target.value
		})
	}

	handlePwdChange(event) {
		this.setState({
			pwd: event.target.value
		})
	}

	handleFeatureChange(){
		if(this.state.feature === "SignUp"){
			this.setState({
				feature: "SignIn"
			})
		}
		else{
			this.setState({
				feature: "SignUp"
			})
		}
	}

	signIn(event) {
		event.preventDefault()
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch(function(error) {
			// Handle Errors here
			var errorCode = error.code;
			var errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
			} else {
			alert(errorMessage);
			}
			// [END_EXCLUDE]
		})
	}

	signUp() {
		//event.preventDefault();
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function(error) {
		  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  // ...
		  if (errorCode === 'auth/weak-password') {
		  	alert('The password is too weak.');
		  }
		  else {
		  	alert(errorMessage);
		  }
		})
	}

	update(details){
		if(details === 'user'){
			this.setState({
				status: this.props.model.getUserStatus()
			})
		}
	}

		
	render() {

		let currentStatus = this.props.model.getUserStatus()

		let feature;
		let header;
		let changeFeature;

		if (currentStatus === "LoggedIn"){
			feature = <h1>Welcome to Librari!</h1>
		}

		else if (this.state.feature === "SignIn"){

			header = "Sign in";

			feature = 	<SignIn handleEmailChange={this.handleEmailChange} 
								handlePwdChange={this.handlePwdChange} 
								signIn={this.signIn} 
								
								/>
			changeFeature = <div>Not registered?
								<div className="linkDiv" onClick={this.handleFeatureChange}> Create an account.</div>
							</div>
			
		}
		else if (this.state.feature === "SignUp"){	
			
			header = "Register"

			feature = 	<SignUp handleEmailChange={this.handleEmailChange} 
								handlePwdChange={this.handlePwdChange} 
								signUp={this.signUp} 
								
								/>
			changeFeature  = 	<div>Already a user?
									<div className="linkDiv" onClick={this.handleFeatureChange}>Sign in here</div>
								</div>
						
		}

		else{
			feature = "Something went terribly wrong"
		}
		
		return (
			<div id="Login">
				<div id="loginHeader">{header}</div>
				{feature}
				{changeFeature}
			</div>
	    )
	}
}


export default LogIn;