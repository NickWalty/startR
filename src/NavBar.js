import React from 'react';

const NavBar = ({ onRouteChange, isSignedIn }) => {
		if(isSignedIn) {
			return (
				<nav className = 'navigation'>
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