import React, {Component} from 'react';

class Clock extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date(),
			hour: new Date().getHours(),
			minute: new Date().getMinutes()
		}
		
		 
		this.am = this.morning(this.state.hour);

	}

	componentDidMount() {
		this.timerID = setInterval(() =>
    	this.tick(),
    	1000);
	}

	tick() {
	    this.setState({
		    time: new Date(),
			hour: new Date().getHours(),
			minute: new Date().getMinutes()
	    });
  	}

  	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	formatHour = (hour) => {
		//Format hours so it doesn't look all weird.
		if(hour > 12 ) {
			return (hour -12);
		} else if (this.state.hour === 0) {
			return (12);
		}
	}

	formatMinute = (minute) => {
		if(minute < 10) {
			return '0'+ minute;
		} else {
			return minute;
		}
	}

	morning = (hour) => {
			if(hour <12) {
				return 'am';
			} else {
				return 'pm';
			}
		}

	
	render() {
		return (
		<div className = 'clock'>
			<p>It's</p>
			<h1>{`${this.formatHour(this.state.hour)}:${this.formatMinute(this.state.minute)}`}</h1> 
			<p>{`${this.am}`}</p>
		</div>
	);
	}
	
}
	


export default Clock;