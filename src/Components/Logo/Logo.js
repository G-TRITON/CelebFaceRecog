import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import profile from './profile.jpg'

const Logo = () => {
	return(
		<div className='ma4 mt4'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
 				<div className="Tilt-inner"> <img alt='logo' src={profile} /> </div>
			</Tilt>
		</div>
		);
}

export default Logo;