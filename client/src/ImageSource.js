import React from 'react';

const ImageSource = ({name, url}) => {

	return (
		<div className = 'source'>
		<a href = {url}>Photo by {name}</a>
		</div>
	);
}

export default ImageSource;