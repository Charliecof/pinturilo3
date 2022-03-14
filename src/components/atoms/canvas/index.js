import React, { useEffect, useRef, useState } from 'react';
import { FaEraser, FaPencilAlt } from 'react-icons/fa';
import './styles.css';
export default function Canvas() {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setDrawing] = useState(false);
	const [color, setColor] = useState('black');
	const [width, setWidth] = useState(1);
	const [tool, setTool] = useState('pencil');
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 890;
		canvas.height = 890;
		canvas.style.width = `450px`;
		canvas.style.height = `450px`;

		const context = canvas.getContext('2d');
		context.scale(2, 2);
		context.lineCap = 'round';
		context.strokeStyle = 'black';
		context.lineWidth = width;
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
	const selectErase = () => {
		contextRef.current.strokeStyle = '#ffffff';
		setTool('eraser');
	};

	const selectPencil =()=>{
		contextRef.current.strokeStyle = color;
		setTool('pencil');
	}

	const changeColor = (e) => {
		setColor(() => e.target.value);
		contextRef.current.strokeStyle = color;
	};

	const changeWidth = (e) => {
		contextRef.current.lineWidth = e.target.value;
		setWidth(e.target.value);
	};

	return (
		<div className="d-flex my-canvas" >
			<div className="cont-canvas">
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
					value={width}
					onChange={changeWidth}
				/>
				<button
					onClick={selectErase}
					className={
						tool === 'eraser'
							? 'btn btn-tool m-2 disabled'
							: 'btn btn-tool m-2'
					}
				>
					<FaEraser />
				</button>
				<button
					onClick={selectPencil}
					className={
						tool === 'pencil'
							? 'btn btn-tool m-2 disabled'
							: 'btn btn-tool m-2'
					}
				>
					<FaPencilAlt />
				</button>
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
