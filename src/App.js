import React from "react";
import { Routes, Route } from 'react-router-dom';
import Game from './components/pages/Game';
import Lobby from "./components/pages/Lobby";
import "./style.css";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Drawings from "./components/pages/Drawings";
import { getToken } from "./utils/actionsAPI";
import { ApolloProvider,InMemoryCache } from "@apollo/react-hooks";
import { ApolloClient } from "@apollo/client";

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql/',
	credentials: 'include',
	cache: new InMemoryCache()
})

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
		<ApolloProvider client={client}>
			<div className="app">
				<Routes>
					<Route path="/login" element={
						<div className="p-5">
							<div className="card p-4">
								<Login handleSubmit={submit}/>
							</div>
						</div>
					} />
					<Route path="/register" element={
						<div className="p-5">
							<h2 className="text-center" style={{color: "#fff"}}>Register</h2>
							<div className="card p-4">
								<Register/>
							</div>
						</div>
					} />
					<Route path="/drawings" element={<Drawings/>} />
					<Route path="/" element={<Lobby/>}/>
					<Route path="/game" element={<Game />}/>
				</Routes>
			</div>
		</ApolloProvider>
	);
}
