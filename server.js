const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
const pg = require('pg');
const cookieSession = require('cookie-session');





const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'NickWalter_1985',
    database : 'startr'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors({credentials: true}));

app.use(cookieSession({
	name:'session',
	secret: 'aslkdjfhGGASDKJFH1010109928',
	maxAge: 24 * 60 * 60 * 1000 * 30 // One month
}))

app.post('/createCookie', (req,res) => {
	const {email, password} = req.body;
	//ensure db has a record of the user

	req.session.email = email;
	req.session.password = password;
	res.end();
})

app.get('/getCookie', (req,res) => {
	if(req.session.email) {
		res.json(req.session);
	} else {
		res.json('No Cookie for you.');
	}
})

app.get('/deleteCookie', (req,res) => {
	if(req.session) {
		req.session = null;
		res.end();
	} else {
		res.end();
	}
})

// db.select('*').from('users').then( data => {
// 	console.log(data);
// })


app.post('/signin', (req,res) => {
	const {email, password} = req.body;
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid) {
				
				return db.select('*').from('users').where('email', '=', email)
				.then(user => {
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('Unable to get user'))
			} else {
				res.status(400).json('Wrong credentials')
			}
		})	
	.catch(err =>res.status(400).json('Wrong Credentials'))
})

app.post('/register', (req,res) => {
	const { id, email, name, password, locationID, celsius } = req.body;
	const saltRounds = 8;
	const hash = bcrypt.hashSync(password, saltRounds);
	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				locationid: locationID,
				celsius: celsius
			}).then( user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
		
		.catch(err => res.status(400).json('Unable to add user'))
	
})

app.put('/update', (req,res) => {
	const {  email, name, password, locationID, celsius } = req.body;
	db('users').where('email', '=', email).update({
		name:name,
		locationid:locationID,
		celsius:celsius
	})
	.then(data => {
		return db.select('*').from('users').where('email', '=', email)
		.then(user => {
			res.json(user[0]);
		})
	})
})

app.put('/updatepass', (req,res) => {
	const {  email, password } = req.body;
	const saltRounds = 8;
	const hashedPass = bcrypt.hashSync(password, saltRounds);
	db('login').where('email', '=', email).update({
		hash: hashedPass
	})
	.then(data => {
		return db.select('*').from('users').where('email', '=', email)
		.then(user => {
			res.json(user[0]);
		})
	})
})

app.post('/weather', (req,res) => {
	const { locationID, celsius } = req.body;
	let units = '';
	let weather = {
		temp: 0,
		name: '',
		description: '',
		icon: ''
	};
	if(celsius) {
		units = 'metric';
	} else {
		units = 'imperial';
	}
	const weatherQuery = 'https://api.openweathermap.org/data/2.5/weather?q='+ locationID +'&units=' + units + '&APPID=30412ac017145c82594fcd78ba2a4ba2'
	fetch(weatherQuery)
	.then(res => res.json())
	.then(weather => res.json(weather))
	.catch(err => console.log(err));
	
})

app.listen(3001, () => {
	console.log('API is running on port 3001.');
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user object
/profile/:userID --> GET = user
/weather --> GET = weather object

*/