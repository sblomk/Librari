import React, { Component } from 'react';
import logo from './book-flat.png';
import './Header.css';

// This view contains the header of our website

class Header extends Component {
	render() {
		return (
		    <header className="header">
	    	    <img src={logo} className="headerLogo" alt="logo" />
	        	<h1 className="headerTitle">Librari</h1>
	        </header>
	     );
	}
}
export default Header;
