import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import firebase from '../firebase.js';

// This view contains the header of our website

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			pwd: ""
		}
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value})
	}

	handlePwdChange(event) {
		this.setState({pwd: event.target.value})
	}

	handleSubmit() {
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

		
	render() {
		
		return (
			<div>
				<label>
				Email
				<input type="text" onChange={this.handleEmailChange}/>
				</label>

				<label>
				Password
				<input type="text" onChange={this.handlePwdChange}/>
				</label>

				<button onClick={this.handleSubmit}>
				Sign in
				</button>
				<button onClick={this.signOut}>
				Sign out
				</button>
			</div>

	     );
	}
}


export default SignIn;