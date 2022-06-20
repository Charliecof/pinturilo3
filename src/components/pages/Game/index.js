import Canvas from '../../atoms/canvas';
import MessageCard from '../../molecules/MessageCard';
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Game() {
	const {state} = useLocation();
	const [message,setMessage] = useState(null)
	const [receivedMessages,setMessages] = useState([]);

	useEffect(()=>{
		if(!message) return 
		setMessages((prev)=>{
			prev = [...prev,message]
			return prev
		})
	},[message])


	return (
		<div className="container-fluid" style={{ height: '100%' }}>
			<div className="row">
				<div className="col"></div>
				<div className="col"></div>
				<div className="col " style={{ textAlign: 'center' }}>
					<p style={{ color: '#fff' }}>
						<span style={{ fontWeight: 'bold' }}>Room ID:</span>{' '}
						{state.room}
					</p>
				</div>
			</div>
			<div className="row p-5" style={{ height: '90%' }}>
				
				<div className="col-6">
					<Canvas setMessages={setMessages} message={message} roomID={state.room} objeto={'Patito de Goma'} />
				</div>
				<div className="col-4" style={{ height: '100%' }}>
					<MessageCard username={state.username}  sendAction={setMessage} messages={receivedMessages} />
				</div>
			</div>
		</div>
	);
}

Game.propTypes = {
	room: PropTypes.string,
};
