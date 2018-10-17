import React, { Component } from 'react';

//Image files are temporarily hosted at http://www.waltechvis.com/icons

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationID: this.props.locationID,
			temp: 0,
			name: 'Halifax',
			description: 'http://openweathermap.org/img/w/01d.png',
			icon: '',
		}
	}

	componentDidMount() {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.locationID},can&units=metric&APPID=30412ac017145c82594fcd78ba2a4ba2`, {
			method: 'get'
		})
			.then((response) => response.json())
			.then((response) => {
				this.setState({temp: response.main.temp});
				this.setState({name: response.name});
				this.setState({description: response.weather[0].description});
				this.setState({icon: response.weather[0].icon});
			});

	}

	render() {
		return (
			<div className = 'weather'>
			<h2>{`${this.state.name}`}</h2>
			<div className = 'forecast'>
				<h1>{Math.round(this.state.temp)}°</h1>
				<img src = {`http://www.waltechvis.com/icons/${this.state.icon}.svg`} alt = {this.state.description} />
			</div>
			<h3 className = 'description'>{`${this.state.description}`}</h3>
			</div>
		);
	}
}

export default Weather;