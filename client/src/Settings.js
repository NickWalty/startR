import React, { Component } from 'react';



class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalPassword: this.props.user.password,
			confirmPassword: '',
			newPassword: '',
			newPassword1: '',
			email: this.props.user.email,
			celsius: this.props.user.celsius,
			locationID: this.props.user.locationID,
			name: this.props.user.name,
			message: 'To modify your password, use the fields below.'
		}


	}

//Settings Update Functions

onPasswordChange = (event) => {
	if(event.target.name === 'password') {
		this.setState({
		confirmPassword: event.target.value
	})
	} else if (event.target.name === 'newPassword') {
		this.setState({
		newPassword: event.target.value
	})
	} else {
		this.setState({
		newPassword1: event.target.value
	})
	}
	
}

onNameChange = (event) => {
	this.setState({
		name: event.target.value
	})
}

onEmailChange = (event) => {
	this.setState({
		email: event.target.value
	})
}

onLocationIDChange = (event) => {
	this.setState({
		locationID: event.target.value
	})
}


updateSubmit = () => {
		const updatedUser = {
		name: this.state.name,
        locationID: this.state.locationID,
        celsius: this.state.celsius,
        email: this.state.email
		}

		fetch('/update', {
			method: 'put',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify(updatedUser)
		})
			.then(response => response.json())
			.then(user => {
				if(user) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
				
			})		
}
updatePass = () => {

		//validate original password
		//.then update with new password
		fetch('/signin', {
		method: 'post',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			email: this.state.email,
			password: this.state.confirmPassword
		})
	})
		.then(res => res.json())
		.then(data => {
			if(data.id) {
				//Ensure new passwords are the same.
				if(this.state.newPassword === this.state.newPassword1) {
					//Get a cookie
					fetch('/createCookie', {
						method: 'post',
						headers: {'content-type': 'application/json'},
						credentials:'include',
						body: JSON.stringify({
							email: this.state.email,
							password: this.state.newPassword
						})
					})
					

					//Update the database with the new password
					fetch('/updatepass', {
						method: 'put',
						headers: {'content-type': 'application/json'},
						body: JSON.stringify({
							email: this.state.email,
							password: this.state.newPassword
						})
					})
					.then(res => res.json())
					.then(data => {
						if(data.id) {
							this.props.loadUser(data);
							this.props.onRouteChange('home')
						} else {
							this.setState({
								message: 'Sorry, invalid credentials.'
							})
						}
					})
				}
			} else {
				this.setState({
					message: 'Sorry, invalid credentials.'
				})
			}
		})
}
updateMetric = () => {
	if(this.state.celsius) {
		this.setState({
			celsius: false
		});
	} else {
		this.setState({
			celsius: true
		});
	}
}

	render() {
		return(
			<div  className = 'settings'>
				<h2>Modify your user settings below</h2>
				<form>
				<p>{this.state.message}</p>
				<div className = 'row'>
				    <p>Current Password</p>
				    <input 
				        type="password" 
				        name="password"  
				        className="password" 
				        onChange={this.onPasswordChange} />
				</div>
				<div className = 'row'>
				    <p>New Password</p>
				    <input 
				        type="password" 
				        name="newPassword"  
				        className="password" 
				        onChange={this.onPasswordChange} />
				</div>
				<div className = 'row'>
				    <p>Confirm New Password</p>
				    <input 
				        type="password" 
				        name="NewPassword2"  
				        className="password" 
				        onChange={this.onPasswordChange} />
				</div>

				    <input
				        type="button" 
				        name="updatePass"  
				        id="updatePass"
				        value="Update Password" 
				        onClick={this.updatePass} />

				<p>To modify other StartR settings, just change them below and click "submit changes".</p>
				<div className = 'row'>
					<p>First Name</p>
					<input 
				        type="text" 
				        name="name"  
				        id="name" 
				        onChange={this.onNameChange} />
				</div>
				<div className = 'row'>
				    <p>City</p>
				    <input 
				        type="text" 
				        name="city"  
				        id="city" 
				        onChange={this.onLocationIDChange} /> 
				</div>
				</form>
				<div className = 'radios'>
				<p>Units</p>
				<form>
				    
				    <input 
				        type="radio" 
				        name="metric"  
				        value = 'Metric'
				        checked = {this.state.celsius}
				        onChange = {this.updateMetric}
				        />
				        <label htmlFor='metric'>Metric</label>
				    <input 
				        type="radio" 
				        name="imperial"  
				        value = 'Imperial' 
				        checked = {!this.state.celsius}
				        onChange = {this.updateMetric}
				         />
				         <label htmlFor='imperial'>Imperial</label>
				</form>
				</div>
				<div className = 'row'>
				</div>
				    <input
				        type="button" 
				        name="updateSettings"  
				        id="updateSettings"
				        value="Update Settings" 
				        onClick={this.updateSubmit} />
			</div>


		)
	}
}

export default Settings;