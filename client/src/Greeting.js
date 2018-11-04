import React from 'react';

const messages = {
	morning: [
		'Good morning',
		'Early bird gets the worm',
		`Up and at 'em`,
		`'Mornin'`,
		'Top of the morning',
		'Enjoy your browsing'
	],
	day: [
		'Good afternoon',
		'Afternoon',
		`Go get 'em`,
		'The day is yours',
		'Have a great day',
		'Hope you find what you need'
	],
	night: [
		'Good evening',
		`'Night`,
		'The night is young',
		'Beautiful night tonight',
		'Happy surfing'
	]
}

let hours;
let greeting = '';
let userName;

const Greeting = ({user, time}) => {

	let messageNum = 0;
	if(hours !== time || user !== userName) {
		userName = user;
		hours = time;
		if(time < 4 || time > 18) {
			messageNum =Math.floor(Math.random()*messages.night.length);
			greeting = `${messages.night[messageNum]}, ${user}.`;
		} else if (time >= 4 && time < 12) {
			messageNum = Math.floor(Math.random()*messages.morning.length);
			greeting = `${messages.morning[messageNum]}, ${user}.`;
		} else {
			greeting = `Good afternoon, ${user}.`;
		}
	} 
		

	return (
		<div className = 'greeting'>
		<h2>{greeting}</h2>
		</div>
	);
}

export default Greeting;