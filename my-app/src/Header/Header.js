import React, { Component } from 'react';
import logo from './book-flat.png';
import './Header.css';

// This view contains the header of our website

class Header extends Component {
	render() {
		return (
	      <div className="Landing">
	        <header className="Landing-header">
	          <img src={logo} className="Landing-logo" alt="logo" />
	          <h1 className="Landing-title">Librari</h1>
	        </header>
	      </div>
	     );
	}
}
export default Header;
