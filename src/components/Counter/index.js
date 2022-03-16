import PropTypes from 'prop-types';
import React from 'react';

export default function Counter({ time }) {
	return (
		<div
			style={{
				width: '50px',
				height: '50px',
				borderRadius: '50%',
				background: '#fff',
				border: '2px solid #000',
			}}
			className="m-2"
		>
			<p style={{ color: '#000', fontWeight: 'bold' }}>{time}</p>
		</div>
	);
}

Counter.propTypes = {
	time: PropTypes.number.isRequired,
};
