import React,{useRef,useEffect, useState} from 'react';
import CanvasDraw from 'react-canvas-draw';
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://localhost:4000'
export default function CanvasTest() {
	const [socket,setSocket] = useState(null);
	//const [canvasData,setCanvas] = useState(null);
	useEffect(()=>{
		const socketAux = socketIOClient(ENDPOINT);
		socketAux.on('connection',(socket)=>console.log(socket))
		socketAux.on('draw',()=>console.log('dibujando'))
		setSocket(socketAux)
		return () => socketAux.close();
	},[setSocket])

	const canvas = useRef(null);

	const handleChange = ()=>{
		socket.emit('draw',9);
	}
	return (
		<div>
			<CanvasDraw
				canvasHeight={900}
				canvasWidth={800}
				saveData={null}
				brushRadius={3}
				brushColor={'#C81616'}
				onChange={handleChange}
				ref={canvas}
			/>
		</div>
	);
}
