import React, { Component } from 'react';

//set up a fake user to test with
const fakeDB = {
	name: 'Nick',
	email: 'nick.bell@gmail.com',
	password: '123',
	locationID: 'Halifax',
	celsius: true,
}
 let fakeUser = {};


class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			regEmail: '',
			regPassword: '',
			regMetric: true,
			regName: '',
			regLocationID: ''
		}
	}

	//SignIn Values
onEmailChange = (event) => {
	this.setState({
		signInEmail: event.target.value
	})
}

onPasswordChange = (event) => {
	this.setState({
		signInPassword: event.target.value
	})
}

//Registration Functions
regPasswordChange = (event) => {
	this.setState({
		regPassword: event.target.value
	})
}

regNameChange = (event) => {
	this.setState({
		regName: event.target.value
	})
}

regEmailChange = (event) => {
	this.setState({
		regEmail: event.target.value
	})
}

regLocationIDChange = (event) => {
	this.setState({
		regLocationID: event.target.value
	})
}

signInSubmit = () => {
	if(this.state.signInEmail === fakeDB.email &&
		this.state.signInPassword === fakeDB.password) {
		this.props.loadUser(fakeDB);
		this.props.onRouteChange('home');
	} else {
		console.log("something fucked up");
	}
}

regSubmit = () => {
		fakeUser = {
		name: this.state.regName,
        locationID: this.state.regLocationID,
        celsius: true,
        email: this.state.regEmail
		}
		this.props.loadUser(fakeUser);
		this.props.onRouteChange('home');
}

	render() {
		return(
			<div  className = 'signIn'>
				<h2>Already a member? Sign in below.</h2>
				<form>
				<div className = 'row'>
					<p>E-mail Address</p>
					<input 
				        type="email" 
				        name="email"  
				        id="email" 
				        onChange={this.onEmailChange} />
				</div>
				<div className = 'row'>
				    <p>Password</p>
				    <input 
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange={this.onPasswordChange} />
				</div>
				    <input
				        type="button" 
				        name="submit"  
				        id="signIn" 
				        value="Sign in"
				        onClick={this.signInSubmit} />
				</form>

				<h2>Not a member yet?  Create an account below!</h2>
				<form>
				<div className = 'row'>
					<p>E-mail Address</p>
					<input 
				        type="email" 
				        name="email"  
				        id="email" 
				        onChange={this.regEmailChange} />
				</div>
				<div className = 'row'>
					<p>First Name</p>
					<input 
				        type="text" 
				        name="name"  
				        id="name" 
				        onChange={this.regNameChange} />
				</div>
				<div className = 'row'>
					<p>Password</p>
					<input 
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange={this.regPasswordChange} />
				</div>
				<div className = 'row'>
				    <p>City</p>
				    <input 
				        type="text" 
				        name="city"  
				        id="city" 
				        onChange={this.regLocationIDChange} />
				</div>
				    <input
				        type="button" 
				        name="register"  
				        id="register"
				        value="Register" 
				        onClick={this.regSubmit} />
				</form>
			</div>


		)
	}
}

export default SignIn;