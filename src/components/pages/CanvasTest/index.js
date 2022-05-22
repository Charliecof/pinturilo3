import React, { /* useRef, useEffect, useState */ } from 'react';
/* import CanvasDraw from 'react-canvas-draw';
import socketIOClient from 'socket.io-client'; */
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

/* const ENDPOINT = 'http://localhost:4000'; */
export default function CanvasTest() {
	/* const [socket, setSocket] = useState(null);
	const canvas = useRef(null); */

	/* useEffect(() => {
		const socketAux = socketIOClient(ENDPOINT);
		socketAux.on('connection', (socket) => console.log(socket));
		socketAux.on('draw', () => console.log('dibujando'));
		socketAux.on('otherData', (data) => {
			canvas.current.canvas.drawing = data
			console.log(data);
		});
		setSocket(socketAux);
		return () => socketAux.close();
	}, [setSocket]); */

	/* const handleChange = () => {
		socket.emit('drawing', canvas.current.getDataURL());
		console.log(canvas.current);
	}; */

	const { editor, onReady } = useFabricJSEditor();
	const onAddCircle = () => {
		editor?.addCircle();
	};
	const onAddRectangle = () => {
		editor?.addRectangle();
	};
	return (
		<div>
			{/* <CanvasDraw
				canvasHeight={900}
				canvasWidth={800}
				saveData={null}
				brushRadius={3}
				brushColor={'#C81616'}
				onChange={handleChange}
				ref={canvas}
			/> */}
			<button onClick={onAddCircle}>Add circle</button>
			<button onClick={onAddRectangle}>Add Rectangle</button>
			<FabricJSCanvas className="sample-canvas" onReady={onReady} />
		</div>
	);
}
