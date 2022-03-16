import Canvas from '../../atoms/canvas';
import Players from '../../molecules/Players';
import MessageCard from '../../molecules/MessageCard';
import React from 'react';
import PropTypes from 'prop-types';

const example = [
	{ name: 'Kevin', score: 0, isUser: false },
	{ name: 'Kevin', score: 0, isUser: true },
	{ name: 'Kevin', score: 0, isUser: false },
];

const messages = [
	{
		user: 'Kevin',
		message:
			'Hola amigos este como estan? lorem  hola adios hola adios hola adios hola adios',
	},
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
	{ user: 'Kevin', message: 'Hola amigos este como estan?' },
];

export default function Game({ room }) {
	return (
		<div className="container-fluid" style={{ height: '100%' }}>
			<div className="row">
				<div className="col"></div>
				<div className="col"></div>
				<div className="col " style={{ textAlign: 'center' }}>
					<p style={{ color: '#fff' }}>
						<span style={{ fontWeight: 'bold' }}>Room ID:</span>{' '}
						{room}
					</p>
				</div>
			</div>
			<div className="row p-5" style={{ height: '90%' }}>
				<div className="col-2">
					<Players players={example} />
				</div>
				<div className="col-6">
					<Canvas objeto={'Patito de Goma'} />
				</div>
				<div className="col-4" style={{ height: '100%' }}>
					<MessageCard messages={messages} />
				</div>
			</div>
		</div>
	);
}

Game.propTypes = {
	room: PropTypes.string.isRequired,
};
