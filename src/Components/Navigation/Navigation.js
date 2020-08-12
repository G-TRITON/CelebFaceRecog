import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({onRouteCh}) => {
	return(
		<nav>
		<Logo />
		<p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteCh('signedout')}>Sign Out</p>
		</nav>
		);
}

export default Navigation;