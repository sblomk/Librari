import React, { Component } from 'react';

class SignUp extends Component {
		
	render() {
		return (
			<div id="signUp">
				<input placeholder="e-mail" type="text" onChange={this.props.handleEmailChange}/>
				<br/>
				<input placeholder="password" type="password" onChange={this.props.handlePwdChange}/>
				<br/>
				<button onClick={this.props.signUp}>
				  Go
				</button>
			</div>
	     );
	}
}


export default SignUp;