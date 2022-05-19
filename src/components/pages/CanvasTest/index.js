import React,{useRef} from 'react';
import CanvasDraw from 'react-canvas-draw';

export default function CanvasTest() {
	/* const [drawing, setDrawing] = useState(null) */
	const canvas = useRef(null);
	let url = `ws://localhost:8000/ws/socket-server/`;
	const gameSocket = new WebSocket(url);
	gameSocket.onmessage = (e)=>{
		console.log('message Received');
		let data = JSON.parse(e.data);
		console.log(data.message,'data');
		if(data.type=='canvasReceive' || data.message!==undefined){
			canvas.current.loadSaveData(data.message,true)	
		}
	}

	/* gameSocket.onopen = function(e){
		alert('Connection opened')
		console.log(e);
	} */

	const handleChange = ()=>{
		gameSocket.send(JSON.stringify({
			'message': canvas.current.getSaveData(),
			'type': 'canvasSend'
		}))
		console.log('changing');
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
