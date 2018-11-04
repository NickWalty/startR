import React from 'react';

const NavBar = ({ onRouteChange, isSignedIn, route }) => {
		if(isSignedIn && route === 'home') {
			return (
				<nav className = 'navigation'>
					<p onClick={() => onRouteChange('settings')}>Settings</p>
					<p onClick={() => onRouteChange('signOut')}>Sign Out</p>
				</nav>
			);
		}else if (isSignedIn && route !== 'home') {
			return (
				<nav className = 'navigation'>
					<p onClick={() => onRouteChange('home')}>Home</p>
					<p onClick={() => onRouteChange('signOut')}>Sign Out</p>
				</nav>
			);
		} else {
			return (
				<nav className = 'navigation'>
					<p onClick={() => onRouteChange('signIn')}>Sign In/Register</p>
				</nav>
			);
		}
}

export default NavBar;