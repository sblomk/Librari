import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import firebase from '../firebase.js';

class SignIn extends Component {
		
	render() {
		
		return (
			<div id="signIn">
				<input placeholder="e-mail" type="text" onChange={this.props.handleEmailChange}/>
				<br/>
				<input placeholder="password" type="text" onChange={this.props.handlePwdChange}/>
				<br/>
				<button onClick={this.props.signIn}>Go</button>
			</div>

	     );
	}
}


export default SignIn;