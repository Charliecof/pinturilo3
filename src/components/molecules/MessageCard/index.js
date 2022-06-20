import PropTypes from 'prop-types';
import Message from '../../atoms/Message';
import React from 'react';
import { useState } from 'react';

export default function MessageCard({ messages, sendAction,username}) {
	const [auxMessage, setAux] = useState(null);
	return (
		<div
			className="p-3 d-flex flex-column justify-content-between"
			style={{
				background: '#fff',
				borderRadius: '10px',
				border: '2px solid #014ba0',
				height: '100%',
			}}
		>
			<div
				style={{
					overflow: 'scroll',
					heigth: '80%',
					overflowX: 'hidden',
				}}
			>
				{messages.map((message, index) => {
					return (
						<>
							<Message
								content={message.message}
								user={message.user}
								key={index}
							/>
						</>
					);
				})}
			</div>
			<div className="p-1 mt-2" style={{ height: '5%' }}>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enviar"
						value={auxMessage}
						onChange={(e) => setAux(e.target.value)}
					/>
					<button
						className="btn btn-outline-secondary btn-warning"
						type="button"
						onClick={() => {
							if(auxMessage==='')return
							sendAction(() => {
								return { user: username, message: auxMessage };
							});
							setAux('');
						}}
					>
						<p style={{ color: '#fff', margin: '0' }}>Enviar</p>
					</button>
				</div>
			</div>
		</div>
	);
}

MessageCard.propTypes = {
	messages: PropTypes.array,
};
