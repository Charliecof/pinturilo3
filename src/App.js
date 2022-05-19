import React from "react";
import { Routes, Route } from 'react-router-dom';
import Game from './components/pages/Game';
import CanvasTest from "./components/pages/CanvasTest";
import "./style.css";
import Login from "./components/pages/Login";
import { getToken } from "./utils/actionsAPI";

export default function App() {
	const submit = async (values)=>{
		console.log(values);
		try {
			const tokenData = await getToken(values);
			console.log(tokenData);
			alert(`Token Access: ${tokenData.access}`);
		} catch (error) {
			alert('Wrong Credentials')
			console.error(error);
		}
	}

	return (
		<div className="app">
			<Routes>
				<Route path="/login" element={
					<div className="p-5">
						<div className="card p-4">
							<Login handleSubmit={submit}/>
						</div>
					</div>
				} />
				<Route path="/socketTest" element={<CanvasTest/>}/>
				<Route path="/game" element={<Game />}/>
			</Routes>
		</div>
	);
}
