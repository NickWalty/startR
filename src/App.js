import React, { Component } from 'react';
import NavBar from './NavBar';
import Greeting from './Greeting';
import Clock from './Clock';
import Weather from './Weather';
import Signin from './SignIn';
import BGImages from './BGImages';
import ImageSource from './ImageSource';
import './App.css';

//Manipulate background

//document.body.style.backgroundImage = `url(${BGImages.morning[4].url})`;

//Halifax code 6324729


const initialState = {
      isSignedIn: false,
      route: 'guest',
      user: {
        name: 'Stranger',
        locationID: 'New York',
        celsius: true,
        email: ''
      },
      time: new Date(),
      height: window.innerHeight,
}

class App extends Component {
  constructor() {
    super();
    //Todo: Get user and location ID from server. Hardcoded to Halifax right now.
    this.state = initialState;
  }

  

  componentDidMount() {
    this.timerID = setInterval(() =>
    this.tick(),
    1000);

    //set window height
    document.body.style.height = `${this.state.height}px`;
    //Change background on mount
    document.body.style.backgroundImage = `${this.getBG(this.state.time)}`;
  }

  tick() {
    this.setState({
      time: new Date()
    });
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
    console.log(route);
    if(route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    } 
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({ user: {
      name: data.name,
      locationID: data.locationID,
      celsius: data.celsius,
      email: data.email
    }})
  }

  render() {
    let display;

    if(this.state.route === 'home') {
      display = (<div className = "mainDisplay" >
            <Greeting time = {this.state.time} user = {this.state.user.name} />
            <Clock time = {this.state.time} />
            <Weather locationID = {this.state.user.locationID} />
          </div>);
    } else if (this.state.route === 'signIn') {
      display = (
        <Signin onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
      );
    } else {
      display = (<div className = "guestDisplay" >
            <Greeting time = {this.state.time} user = {this.state.user.name} />
            <Clock time = {this.state.time} />
            <Weather locationID = {this.state.user.locationID} />
            <p>Welcome to StartR, a beautiful way to start your browsing. Just sign up and set StartR as your homepage, and you can start your browsing with beautiful photos and weather info for your city.</p>
          </div>);
    }
    return (
      <div>
        <NavBar isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
          
        {display}
        
        <ImageSource name = {this.state.bgName} url = {this.state.bgSource} />
      </div>
    );
  }
}

export default App;
