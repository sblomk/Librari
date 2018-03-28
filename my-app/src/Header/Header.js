import React, { Component } from 'react';
import logo from './book-flat.png';
import './Header.css';
class Header extends Component {
	render() {
		return (
	      <div className="Landing">
	        <header className="Landing-header">
	          <img src={logo} className="Landing-logo" alt="logo" />
	          <h1 className="Landing-title">Librari</h1>
	        </header>
	        <p className="Landing-intro">
	          To get started, edit <code>src/App.js</code> and save to reload.
	        </p>
	      </div>
	     );
	}
}
export default Header;
