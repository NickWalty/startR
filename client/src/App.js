import React, { Component } from 'react';
import NavBar from './NavBar';
import Greeting from './Greeting';
import Clock from './Clock';
import Weather from './Weather';
import Signin from './SignIn';
import Settings from './Settings';
import BGImages from './BGImages';
import ImageSource from './ImageSource';
import './App.css';


const initialState = {
      isSignedIn: false,
      route: 'guest',
      user: {
        id: 0,
        name: 'Stranger',
        locationID: 'New York',
        celsius: false,
        email: ''
      },
      time: new Date(),
      height: window.innerHeight,
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentWillMount() {
        this.getCookie();
  }

  componentDidMount() {
    //set window height
    document.body.style.height = `${this.state.height}px`;
    //Change background on mount
    document.body.style.backgroundImage = `${this.getBG(this.state.time)}`;
  }

  

  //Check for cookies on launch
  getCookie() {
    fetch('/getCookie')
    .then(res => res.json())
    .then(cookie => {
      if(cookie.email) {
         // If a cookie is present, validate User
      fetch('/signin', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        credentials:'include',
        body: JSON.stringify({
          email: cookie.email,
          password: cookie.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.id) {
            this.loadUser(data);
            this.onRouteChange('home');
          } 
        })
      } else {
        return;
      }

    })
  }

  deleteCookie() {
    fetch('/deleteCookie')
  }
    

  getBG(time) {
    //Changes the background image based on the time of day
    const pic = Math.floor(Math.random() * 10);

    if(time.getHours() < 4 || time.getHours() > 18) {
      this.setState({
        bgName:BGImages.night[pic].name,
        bgSource:BGImages.night[pic].source
      });
      return `url(${BGImages.night[pic].url})`;
    } else if (time.getHours() >= 4 && time.getHours() < 12) {
      this.setState({
        bgName:BGImages.morning[pic].name,
        bgSource:BGImages.morning[pic].source
      });
      return `url(${BGImages.morning[pic].url})`;
    } else {
      this.setState({
        bgName:BGImages.day[pic].name,
        bgSource:BGImages.day[pic].source
      });
      return `url(${BGImages.day[pic].url})`;
    }
  }

  onRouteChange = (route) => {
    if(route === 'signOut') {
      //Clear cookies
      this.deleteCookie();
      //Send user back to guest page
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true,
      });
    } 
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({ user: {
      name: data.name,
      locationID: data.locationid,
      celsius: data.celsius,
      email: data.email
    }})
  }

  render() {
    let display;

    if(this.state.route === 'home') {
      display = (<div className = "mainDisplay" >
            <Greeting time = {this.state.time.getHours()} user = {this.state.user.name} />
            <Clock />
            <Weather locationID = {this.state.user.locationID} celsius = {this.state.user.celsius} />
          </div>);
    } else if (this.state.route === 'signIn') {
      display = (
        <Signin onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
      );
    } else if (this.state.route === 'settings') {
      display = (
      <Settings onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} user = {this.state.user} />
      );
    }

    else {
      display = (<div className = "guestDisplay" >
            <Greeting time = {this.state.time.getHours()} user = {this.state.user.name} />
            <Clock time = {this.state.time} />
            <Weather locationID = {this.state.user.locationID} celsius = {this.state.user.celsius} />
            <p>Welcome to StartR, a beautiful way to start your browsing. Just sign up and set StartR as your homepage, and you can start your browsing with beautiful photos and weather info for your city.</p>
          </div>);
    }
    return (
      <div>
        <NavBar isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} route = {this.state.route}/>
          
        {display}
        
        <ImageSource name = {this.state.bgName} url = {this.state.bgSource} />
      </div>
    );
  }
}

export default App;
