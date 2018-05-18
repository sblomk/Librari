import React, { Component } from 'react';
import './LogIn.css';
import firebase from '../firebase.js';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

class LogIn extends Component {
	

	constructor(props) {
		super(props);
		this.state = {
			email: "", 
			pwd: "", 
			feature: "SignIn", 
			status: this.props.model.getUserStatus()
		}
		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleFeatureChange = this.handleFeatureChange.bind(this);
		this.signIn = this.signIn.bind(this);
		this.signUp = this.signUp.bind(this);
		this.update = this.update.bind(this);
		
	}

	componentDidMount() {
		this.props.model.addObserver(this);
	}
	componentWillUnmount() {
		this.props.model.removeObserver(this);
	}

	//Handle the input for the e-mail
	handleEmailChange(event) {
		this.setState({
			email: event.target.value
		})
	}

	//Handle the input for password
	handlePwdChange(event) {
		this.setState({
			pwd: event.target.value
		})
	}

	//Controller to decide which feature to change to (the text in the bottom of the login window)
	//If the SignIn feature is active, you will be able to change to the SignUp feature, 
	//And vice versa
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

	//Firebase function to login
	signIn(event) {
		event.preventDefault()
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch(function(error) {
			// Handle Errors here
			var errorCode = error.code;
			var errorMessage = error.message;

			if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
			} 
			else {
			alert(errorMessage);
			}
		})
	}

	//Firebase function to sign up. 
	//If the password is weak or the username is not an email adress, it will cause alerts.
	signUp() {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function(error) {
		  let errorCode = error.code;
		  let errorMessage = error.message;

		  if (errorCode === 'auth/weak-password') {
		  	alert('The password is too weak.');
		  }
		  else {
		  	alert(errorMessage);
		  }
		})
	}

	//The page will re render as the user status is changed.
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
		let welcome;

		//If you enter /login and are already logged in, it will only render a welcome text
		if (currentStatus === "LoggedIn"){
			welcome = 	<div>
							<h1>Welcome to Librari!</h1>
							<p>Click on Search to get started.</p>
						</div>
		}

		//Otherwise it will either render the SignIn component or the SignUp component depending on what login feature is selected
		else{
			if (this.state.feature === "SignIn"){
				header = <div id="loginHeader">Sign in</div>
				
				//The functions needed are sent as properties to the component
				feature = 	<SignIn handleEmailChange={this.handleEmailChange} 
									handlePwdChange={this.handlePwdChange} 
									signIn={this.signIn}
									/>
				//If you are currently at the SignIn feature, you are able to change the feature here
				changeFeature = <div className="changeFeature">Not registered?
									<div className="linkDiv" onClick={this.handleFeatureChange}> Create an account.</div>
								</div>
				
			}
			else if (this.state.feature === "SignUp"){	
				
				header = 	<div id="loginHeader">Register</div>

				//The functions needed are sent as properties to the component
				feature = 	<SignUp handleEmailChange={this.handleEmailChange} 
									handlePwdChange={this.handlePwdChange} 
									signUp={this.signUp} 	
									/>
				//If you are currently at the SignUp feature, you are able to change the feature here
				changeFeature  = 	<div className="changeFeature">Already a user?
										<div className="linkDiv" onClick={this.handleFeatureChange}>Sign in here</div>
									</div>			
			}
			else{
				feature = "Something went terribly wrong. Please reload the page."
			}

		}

		
		
		return (
			<div id="Login">
				<div id="loginWindow">
					{header}
					{feature}
					{changeFeature}
				</div>
				<div id="welcomeText">
					{welcome}
				</div>
			</div>
	    )
	}
}


export default LogIn;