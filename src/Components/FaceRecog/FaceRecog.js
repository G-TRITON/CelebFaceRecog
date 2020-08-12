import React from 'react';
import './FaceRecog.css';

const FaceRecog = ({ imgUrl, box, celebName }) => {
	return(
		<div className='center ma'>
		<div className='absolute mt2'>
			<img alt='pic' src={imgUrl} id='img' width='500px' height='auto'/>
			<div className="bounding-box" style={{top: box.topRow,
			 right: box.rightCol,
			  bottom: box.bottomRow,
			 left: box.leftCol}}>
			 <span className='concept_name bounding-box'>{celebName}</span>
			</div>
 		</div>
 		</div>
		);
}

export default FaceRecog;