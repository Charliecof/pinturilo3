import React from 'react';
import PlayerCard from '../../atoms/PlayerCard';
import PropTypes from 'prop-types';

export default function Players({ players }) {
	return (
		<div
			style={{
				borderRadius: '10px',
				backgroundColor: '#fff',
				height: '100%',
			}}
		>
			{players ? players.map((player,index) => {
				return (
					<>
						<PlayerCard
							name={player.name}
							isUser={player.isUser}
							score={player.score}
							key={index}
						/>
					</>
				);
			})
				: 
				null}
		</div>
	);
}

Players.propTypes = {
	players: PropTypes.array.isRequired,
};
