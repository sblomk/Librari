import React, { Component } from 'react';
import logo from './logo.svg';
import '../App.css';
class Landing extends Component {
	render() {
		return (
	      <div className="Landing">
	        <header className="Landing-header">
	          <img src={logo} className="Landing-logo" alt="logo" />
	          <h1 className="Landing-title">Welcome to React</h1>
	        </header>
	        <p className="Landing-intro">
	          To get started, edit <code>src/App.js</code> and save to reload.
	        </p>
	      </div>
	     );
	}
}
export default Landing;