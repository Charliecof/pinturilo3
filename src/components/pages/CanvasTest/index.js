import React,{useRef,useEffect,useState} from 'react';
import CanvasDraw from 'react-canvas-draw';

export default function CanvasTest() {
	const [drawing/* setDrawing */] = useState(null)
	const canvas = useRef(null);
	let url = `ws://localhost:8000/ws/socket-server/`;
	const gameSocket = new WebSocket(url);
	gameSocket.onmessage = (e)=>{
		let data = JSON.parse(e.data);
		console.log(data);
	}

	useEffect(() => {
		/* if(drawing){
			gameSocket.send(JSON.stringify({
				'message': drawing
			}))
		} */
		
	}, [drawing]);

	const handleChange = ()=>{
		/* const aux = canvas.current.getSaveData(); */
		/* setDrawing(aux); */
		gameSocket.send(JSON.stringify({
			'message': canvas.current.getSaveData()
		}))
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
