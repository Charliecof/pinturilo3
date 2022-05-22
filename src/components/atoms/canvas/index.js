import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaEraser, FaPencilAlt } from 'react-icons/fa';
import Counter from '../../Counter';
import './styles.css';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000';

export default function Canvas({ objeto }) {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setDrawing] = useState(false);
	const [color, setColor] = useState('black');
	const [width, setWidth] = useState(1);
	const [tool, setTool] = useState('pencil');
	const [socket, setSocket] = useState(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.style.width = '93.5%';
		const ancho = window.getComputedStyle(canvas).width;
		const alto = window.getComputedStyle(canvas).height;
		canvas.width = parseInt(ancho.substring(0, ancho.length - 2)) * 2;
		canvas.height = parseInt(alto.substring(0, alto.length - 2)) * 2;
		const context = canvas.getContext('2d');
		context.scale(2, 2);
		context.lineCap = 'round';
		context.strokeStyle = 'black';
		context.lineWidth = width;
		contextRef.current = context;
	}, []);

	const drawLine = (x0, y0, x1, y1, color, brush_width, emit) => {
		contextRef.current.beginPath();
		contextRef.current.moveTo(x0, y0);
		contextRef.current.lineTo(x1, y1);
		contextRef.current.strokeStyle = color;
		contextRef.current.lineWidth = brush_width;
		console.log(color, brush_width);
		contextRef.current.stroke();
		contextRef.current.closePath();
		if (emit) {
			socket.emit('drawingSend', {
				x0: x0,
				y0: y0,
				x1: x1,
				y1: y1,
				color: color,
				brush_width: brush_width,
			});
		}
	};

	useEffect(() => {
		const socketAux = socketIOClient(ENDPOINT);
		socketAux.on('connection', (socket) => console.log(socket));
		socketAux.on('draw', () => console.log('dibujando'));
		socketAux.on('otherData', (data) => {
			drawLine(
				data.x0,
				data.y0,
				data.x1,
				data.y1,
				data.color,
				data.brush_width
			);
		});
		setSocket(socketAux);
		return () => socketAux.close();
	}, [setSocket]);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		setPosition({ x: offsetX, y: offsetY });
		setDrawing(true);
	};

	const finishDrawing = () => {
		setDrawing(false);
	};

	const draw = ({ nativeEvent }) => {
		if (isDrawing) {
			const { offsetX, offsetY } = nativeEvent;
			drawLine(
				position.x,
				position.y,
				offsetX,
				offsetY,
				color,
				width,
				true
			);
			contextRef.current.stroke();
			socket.emit('drawing', { x: offsetX, y: offsetY });
			setPosition({ x: offsetX, y: offsetY });
		}
		return;
	};

	const selectErase = () => {
		setTool('eraser');
	};

	const selectPencil = () => {
		setTool('pencil');
	};

	const changeColor = (e) => {
		setColor(() => e.target.value);
	};

	const changeWidth = (e) => {
		setWidth(e.target.value);
	};

	return (
		<div className="my-canvas" style={{ height: '100%' }}>
			<div
				style={{
					width: '100%',
					backgroundColor: '#CE3E3E',
					height: '10%',
					borderRadius: '25px 25px 0 0',
					textAlign: 'center',
					color: '#fff',
					fontSize: '30px',
				}}
				className="d-flex justify-content-around"
			>
				<Counter time={22} />
				<p className="p-3">{objeto}</p>
				<div></div>
			</div>
			<div className="d-flex" style={{ height: '90%' }}>
				<div
					className="d-flex flex-column cont-canvas"
					style={{ backgroundColor: '#FFF25A' }}
				>
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
					style={{ border: '3px solid #ccc', width: '100%' }}
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
	objeto: PropTypes.string.isRequired,
};
