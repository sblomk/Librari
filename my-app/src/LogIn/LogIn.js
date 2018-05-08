import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
			feature: "SignIn"
		}
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleFeatureChange = this.handleFeatureChange.bind(this);
		this.signIn = this.signIn.bind(this);
		this.signUp = this.signUp.bind(this);
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

	signIn() {
		//event.preventDefault();
		console.log(1);
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
			console.log(error);
			// [END_EXCLUDE]
        });
	}

	signOut() {
		firebase.auth().signOut();
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
		  console.log(error);
	    }
		);
	}

		
	render() {

		let feature;
		let header;
		let redirect;

		if (this.state.feature === "SignIn"){
			feature = 	<SignIn handleEmailChange={this.handleEmailChange} handlePwdChange={this.handlePwdChange} signIn={this.signIn} />
			redirect =  <div>Not registered?
							<div class="linkDiv" onClick={this.handleFeatureChange}> Create an account.</div>
						</div>
			header = "Sign in";
			
		}
		else if (this.state.feature === "SignUp"){
			feature = 	<SignUp handleEmailChange={this.handleEmailChange} handlePwdChange={this.handlePwdChange} signUp={this.signUp} />
			redirect = 	<div>Already a user?
							<div class="linkDiv" onClick={this.handleFeatureChange}>Sign in here</div>
						</div>
			header = "Register"
						
		}

		else(
			feature = "Something went terribly wrong. Try and reload the page."
		)
		
		return (
			<div id="Login">
				<div id="loginHeader">{header}</div>
				{feature}
				{redirect}
			</div>
	    )
	}
}


export default LogIn;