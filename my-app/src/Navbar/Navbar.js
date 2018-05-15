import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import firebase from '../firebase.js'


// This view contains the header of our website

class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			email: null,
			status: this.props.model.getUserStatus()
		})
		console.log(this.state.status + " status ya")
		this.addListener();

		this.props.model.addObserver(this)

		this.logOut = this.logOut.bind(this)
		this.update = this.update.bind(this)


	}

	// observer som lyssnar efter data från den som är inloggad
	addListener() {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in
				this.setState({
					email: user.email, 
					status: "LoggedIn"
				});
				this.props.model.setUserStatus(this.state.status)
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
				this.setState({
					status: "LoggedOut"
				})
			}
		}.bind(this));
	}

	logOut() {
		firebase.auth().signOut();
		this.props.model.setUserStatus("LoggedOut")
		this.setState({
			userStatus: "LoggedOut",
			email: null
		})
	}

	update(){
		this.setState({
			status: this.props.model.getUserStatus()
		})
	}


	render() {

		let currentStatus = this.state.status

		let profile;
		let loginFeature;

		if(currentStatus === "LoggedOut"){

			profile = ""

			loginFeature = 	<Link to="/login">
								<span className="glyphicon glyphicon-cog"></span> Log in
							</Link>
		}
		else{
			profile = 		<Link to="/profile" title="Go to MyLibrari">
								<span className="glyphicon glyphicon-user"></span> MyLibrari
							</Link>

			loginFeature = 	<span className="logout" onClick={this.logOut} title="Goodbye!">
								<span className="glyphicon glyphicon-cog"></span> Log out
							</span>

		}
		return (
			<div className="navbar">
				{profile}
				<Link to="/" title="Search for books">
					<span className="glyphicon glyphicon-search"></span> Search
				</Link>
				{loginFeature}
				<span>{this.state.email}</span>
			</div> 
		);
	}
}

export default Navbar;
