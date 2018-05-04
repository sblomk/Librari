import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

// This view contains the header of our website

class SignUp extends Component {
	var email = "";
	var password = "";

	emailChange = (event) => {
		email=event.target.value;
	}

	passwordChange = (event) => {
		password=event.target.value;
	}

	registerUser = () => {
		console.log(email + " " + password);
	}

	register() {

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});

	};
		

	render() {
		return (
	        <div className="Sigup">
	        	<form onSubmit="return false">
	        		<input id="email" type="text" placeholder="Email" value={this.state.value} onChange={this.emailChange}/>
	        		<input id="password" type="text" placeholder="password" value={this.state.value} onChange={this.passwordChange}/>
	        		<button id="signup" className="btn btn-primary" onClick={this.registerUser} type="button">Register</button>
	        	</form>
	        </div> 
	     );
	}
}


export default SignUp;