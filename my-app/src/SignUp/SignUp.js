import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import firebase from '../firebase.js';

// This view contains the header of our website

class SignUp extends Component {
		
	render() {
		return (
			<div id="signUp">
				<input placeholder="e-mail" type="text" onChange={this.props.handleEmailChange}/>
				<br/>
				<input placeholder="password" type="text" onChange={this.props.handlePwdChange}/>
				<br/>
				<button onClick={this.props.signUp}>
				  Go!
				</button>
			</div>
	     );
	}
}


export default SignUp;