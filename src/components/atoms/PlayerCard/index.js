import React from 'react';
import PropTypes from 'prop-types';
import { BsFillPencilFill } from 'react-icons/bs';

export default function PlayerCard({ name, score, isUser }) {
	return (
		<div
			className="d-flex p-3 justify-content-start"
			style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px' }}
		>
			<div className="p-2">
				<BsFillPencilFill
					color={isUser ? '#014ba0' : '#96b3ff'}
					fontSize={'35px'}
				/>
			</div>
			<div>
				<p className="m-0">{name}</p>
				<p className="m-0" style={{ color: '#ccc' }}>
					SCORE: {score}
				</p>
			</div>
		</div>
	);
}

PlayerCard.propTypes = {
	name: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	isUser: PropTypes.bool.isRequired,
};
