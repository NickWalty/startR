import React, { Component } from 'react';

//Image files are temporarily hosted at http://www.waltechvis.com/icons

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationID: 'New York',
			celsius: false,
			temp: 0,
			name: 'New York',
			description: 'Sunny',
			icon: '01d',
		}
		this.currentID = ''
	}

	componentDidMount() {
		this.getWeather(this.props.locationID, this.props.celsius);	
	}

	componentDidUpdate(prevProps) {
  	//Check if props have updated, if so, fetch weather
	  if (this.props.locationID !== prevProps.locationID) {
	    this.getWeather(this.props.locationID, this.props.celsius);
	  }
	}

	getWeather(locationID, celsius) {
		fetch('/weather', {
		method: 'post',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
		locationID: locationID,
		celsius: celsius
		})
	})
	.then((response) => response.json())
	.then((response) => {
		if(!response.message) {
			console.log('Weather received!')
			this.setState({temp: response.main.temp});
			this.setState({name: response.name});
			this.setState({description: response.weather[0].description});
			this.setState({icon: response.weather[0].icon});
		} else {
			this.setState({temp: 0});
			this.setState({name: 'Error'});
			this.setState({description: `City not found. Use the settings link to change your city.`});
			this.setState({icon: '01d'});
		}
		
	})
	.catch(err => console.log(err))
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