import React from 'react';
import Game from './components/pages/Game';
import './style.css'
// import Login from './components/pages/Login';
export default function App() {
	return (
		<div className="app">
			<Game room={205134} />
			{/* <Login /> */}
		</div>
	);
}
