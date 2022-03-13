import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
export default function Canvas() {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setDrawing] = useState(false);
	const [color, setColor] = useState('black');
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 1000;
		canvas.height = 1000;
		canvas.style.width = `500px`;
		canvas.style.height = `500px`;

		const context = canvas.getContext('2d');
		context.scale(2, 2);
		context.lineCap = 'round';
		context.strokeStyle = 'black';
		context.lineWidth = 1;
		contextRef.current = context;
	}, []);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setDrawing(true);
	};
	const finishDrawing = () => {
		contextRef.current.closePath();
		setDrawing(false);
	};
	const draw = ({ nativeEvent }) => {
		if (isDrawing) {
			const { offsetX, offsetY } = nativeEvent;
			contextRef.current.lineTo(offsetX, offsetY);
			contextRef.current.stroke();
		}
		return;
	};

	const changeColor = (e) => {
		setColor(() => e.target.value);
		contextRef.current.strokeStyle = color;
	};

	const changeWidth = (e)=>{
		contextRef.current.lineWidth = e.target.value;
	}

	return (
		<div className="d-flex">
			<div>
				<input
					className="form-control form-control-color"
					type="color"
					onChange={changeColor}
					value={color}
				/>
				<input
					type="range"
					max="8"
					min="1"
					className="m-4"
					orient="vertical"
					onChange={changeWidth}
				/>
				<button className=''></button>
			</div>
			<canvas
				style={{ border: '2px solid #ccc' }}
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseUp={finishDrawing}
				onMouseMove={draw}
				id="canvas"
			/>
		</div>
	);
}
