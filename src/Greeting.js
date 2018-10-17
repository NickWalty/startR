import React from 'react';

const Greeting = ({user, time}) => {
	console.log(time.getHours());
	let greeting = '';
		if(time.getHours() < 4 || time.getHours() > 18) {
			greeting = `Good evening, ${user}.`;
		} else if (time.getHours() >= 4 && time.getHours() < 12) {
			greeting = `Good morning, ${user}.`;
		} else {
			greeting = `Good afternoon, ${user}.`;
		}

	return (
		<div className = 'greeting'>
		<h2>{greeting}</h2>
		</div>
	);
}

export default Greeting;