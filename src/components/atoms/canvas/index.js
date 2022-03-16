import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaEraser, FaPencilAlt } from 'react-icons/fa';
import Counter from '../../Counter';
import './styles.css';
export default function Canvas({objeto}) {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setDrawing] = useState(false);
	const [color, setColor] = useState('black');
	const [width, setWidth] = useState(1);
	const [tool, setTool] = useState('pencil');
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.style.width = '93.5%'
		const ancho = window.getComputedStyle(canvas).width;
		const alto =window.getComputedStyle(canvas).height;
		canvas.width = parseInt(ancho.substring(0,ancho.length-2))*2; 
		canvas.height = parseInt(alto.substring(0,alto.length-2))*2; 
		console.log(ancho.substring(0,ancho.length-2),alto.substring(0,alto.length-2)); 	
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

	const selectPencil = () => {
		contextRef.current.strokeStyle = color;
		setTool('pencil');
	};

	const changeColor = (e) => {
		setColor(() => e.target.value);
		contextRef.current.strokeStyle = color;
	};

	const changeWidth = (e) => {
		contextRef.current.lineWidth = e.target.value;
		setWidth(e.target.value);
	};

	return (
		<div className="my-canvas" style={{height:'100%'}}>
			<div
				style={{
					width: '100%',
					backgroundColor: '#CE3E3E',
					height: '10%',
					borderRadius: '25px 25px 0 0',
					textAlign: 'center',
					color:'#fff',
					fontSize:"30px"
				}}
				className="d-flex justify-content-around"
			>	
				<Counter time={22} />
				<p className="p-3">{objeto}</p>
				<div></div>
			</div>
			<div className="d-flex" style={{height:'90%'}}>
				<div className="d-flex flex-column cont-canvas" style={{backgroundColor:'#FFF25A'}}>
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
					style={{ border: '3px solid #ccc',width:'100%' }}
					ref={canvasRef}
					onMouseDown={startDrawing}
					onMouseUp={finishDrawing}
					onMouseMove={draw}
					id="canvas"
				/>
			</div>
		</div>
	);
}

Canvas.propTypes = {
	objeto:  PropTypes.string.isRequired
};
