import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import firebase from '../firebase.js'


// This view contains the header of our website

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: null
		}
		this.addListener();
	}

	// observer som lyssnar efter data från den som är inloggad
	addListener() {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				this.setState({email: user.email})
				/*
				var mail = user.email;
				var displayName = user.displayName;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
		    	// ...
		    	console.log(this.state.email)
		    	console.log(uid)
		    	*/
		    } else {
			    // User is signed out.
				// ...
			}
		}.bind(this));
	}


	render() {
		return (
			<div className="navbar">
				<Link to="/profile">
				<span className="glyphicon glyphicon-user"></span> MyLibrari
				</Link>
				<Link to="/">
				<span className="glyphicon glyphicon-search"></span> Search
				</Link>
				<Link to="/signup">
				<span className="glyphicon glyphicon-cog"></span> Sign up
				</Link>
				<Link to="/signin">
				<span className="glyphicon glyphicon-cog"></span> Sign in
				</Link>
				<span>{this.state.email}</span>
			</div> 
		);
	}
}

export default Navbar;
