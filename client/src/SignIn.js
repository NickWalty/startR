import React, { Component } from 'react';


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

		let signInMessage = '';
		let regMessage = '';
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

	//Get a cookie
	fetch('/createCookie', {
		method: 'post',
		headers: {'content-type': 'application/json'},
		credentials:'include',
		body: JSON.stringify({
			email: this.state.signInEmail.toLowerCase(),
			password: this.state.signInPassword
		})
	})
	

	//Validate User
	fetch('/signin', {
		method: 'post',
		headers: {'content-type': 'application/json'},
		credentials:'include',
		body: JSON.stringify({
			email: this.state.signInEmail.toLowerCase(),
			password: this.state.signInPassword
		})
	})
		.then(res => res.json())
		.then(data => {
			if(data.id) {
				this.props.loadUser(data);
				this.props.onRouteChange('home')
			} else {
				this.signInMessage = 'Sorry, invalid credentials.';
			}
		})
}

regSubmit = () => {
		const newUser = {
		name: this.state.regName,
        locationID: this.state.regLocationID,
        celsius: this.state.regMetric,
        email: this.state.regEmail.toLowerCase(),
        password: this.state.regPassword
		}

		//Validate fields
		if(newUser.name === '' ||
		newUser.locationID === '' ||
		newUser.email === '' ||
		newUser.password === '') {
			return this.regMessage = 'All fields must be filled in to register.'
		} 
		fetch('/register', {
			method: 'post',
			headers: {'content-type': 'application/json'},
			credentials:'include',
			body: JSON.stringify(newUser)
		})
		.then(response => response.json())
		.then(user => {
			if(user) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
			
		})	
}

regMetric = (event) => {
	if(this.state.regMetric) {
		this.setState({
			regMetric: false
		})
	} else {
		this.setState({
			regMetric: true
		})
	}
	console.log(this.state.regMetric)
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
				        className ="email" 
				        onChange={this.onEmailChange} />
				</div>
				<div className = 'row'>
				    <p>Password</p>
				    <input 
				        type="password" 
				        name="password"  
				        className="password" 
				        onChange={this.onPasswordChange} />
				</div>
				<p>{this.signInMessage}</p>
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
				        className ="email" 
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
				        className ="password" 
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
				</form>
				<div className = 'radios'>
				<p>Units</p>
				<form>
				    
				    <input 
				        type="radio" 
				        name="metric"  
				        value = 'Metric'
				        checked = {this.state.regMetric}
				        onChange = {this.regMetric}
				        />
				        <label htmlFor='metric'>Metric</label>
				    <input 
				        type="radio" 
				        name="imperial"  
				        value = 'Imperial' 
				        checked = {!this.state.regMetric}
				        onChange = {this.regMetric}
				         />
				         <label htmlFor='imperial'>Imperial</label>
				</form>
				</div>
				<p>{this.regMessage}</p>
				    <input
				        type="button" 
				        name="register"  
				        id="register"
				        value="Register" 
				        onClick={this.regSubmit} />
			</div>


		)
	}
}

export default SignIn;