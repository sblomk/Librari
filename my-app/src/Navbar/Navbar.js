import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// This view contains the header of our website

class Navbar extends Component {
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
	          	<span className="glyphicon glyphicon-cog"></span> Search
	          </Link>
	        </div> 
	     );
	}
}
export default Navbar;
