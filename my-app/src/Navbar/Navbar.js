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
		this.showResponsiveBar = this.showResponsiveBar.bind(this)
		this.hideResponsiveBar = this.hideResponsiveBar.bind(this)


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

	showResponsiveBar() {
		var x = document.getElementById("myNavbar");
		if (x.className === "navbar") {
			x.className += " responsive";
		} else {
			x.className = "navbar";
		}
	}

	hideResponsiveBar(){
		var x = document.getElementById("myNavbar");
		if (x.className === "navbar responsive") {
			x.className = "navbar";
		} else {
			x.className = "navbar responsive";
		}

	}


	render() {

		let currentStatus = this.state.status

		let profile;
		let loginFeature;
		let library;

		if(currentStatus === "LoggedOut"){

			library = ""

			loginFeature = 	<Link to="/login" onClick={this.hideResponsiveBar}>
								<span className="glyphicon glyphicon-log-in"></span> Log in
							</Link>

			profile = ""
			
		}
		else{
			library = 		<Link to="/profile" title="Go to MyLibrari" onClick={this.hideResponsiveBar}>
								<span className="glyphicon glyphicon-book"></span> MyLibrari
							</Link>

			loginFeature = 	<Link to="/login" title="Go to MyLibrari" onClick={this.hideResponsiveBar}>
								<span onClick={this.logOut} title="Goodbye!">
									<span className="glyphicon glyphicon-log-out"></span> Log out
								</span>
							</Link>
			profile =		<div className="user">
								<span className="glyphicon glyphicon-user"></span> {this.state.email}
							</div>

		}
		return (
			<div className="navbar" id="myNavbar">
				{library}
				<Link to="/" title="Search for books">
					<span className="glyphicon glyphicon-search"></span> Search
				</Link>
				{loginFeature}
				{profile}
				<a href="javascript:void(0);" className="icon" onClick={this.showResponsiveBar}>
    				<span className="glyphicon glyphicon-menu-hamburger"></span>
  				</a>
			
			</div> 
		);
	}
}

export default Navbar;
