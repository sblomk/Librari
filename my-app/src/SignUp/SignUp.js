import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import firebase from '../firebase.js';

// This view contains the header of our website

class SignUp extends Component {

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
		//event.preventDefault();
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
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
				  Activate Lasers
				</button>
			</div>
	     );
	}
}


export default SignUp;