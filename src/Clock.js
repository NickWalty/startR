import React from 'react';

const Clock = (props) => {
	//Todo: Format this better.
	let hour = props.time.getHours();
	let minute = props.time.getMinutes();
	let morning = (hour) => {
		if(hour <12) {
			return 'am';
		} else {
			return 'pm';
		}
	}
	const am = morning(hour);

	//Format hours so it doesn't look all weird.
	if(hour > 12 ) {
		hour = hour -12;
	} else if (hour === 0) {
		hour = 12;
	}
	if(minute < 10) {
		minute = '0'+minute;
	}

	return (
		<div className = 'clock'>
			<p>It's</p>
			<h1>{`${hour}:${minute}`}</h1> 
			<p>{`${am}`}</p>
		</div>
	);
}

export default Clock;