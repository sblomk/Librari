import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {



	render() {

		return (
			<div id="signIn">
				<form className="commentForm" onSubmit={this.props.signIn}>
					<input placeholder="e-mail" type="text" onChange={this.props.handleEmailChange}/>
					<br/>
					<input placeholder="password" type="password" onChange={this.props.handlePwdChange}/>
					<br/>
					<button type="submit">Go</button>
				</form>
			</div>

	     );
	}
}


export default SignIn;