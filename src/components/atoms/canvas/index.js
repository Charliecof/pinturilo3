import React, { useEffect, useRef, useState } from 'react';

export default function Canvas() {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setDrawing] = useState(false);
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth * 2;
		canvas.height = window.innerHeight * 2;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;

		const context = canvas.getContext('2d');
		context.scale(2, 2);
		context.lineCap = 'round';
		context.strokeStyle = 'black';
		context.lineWidth = 5;
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

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={startDrawing}
			onMouseUp={finishDrawing}
			onMouseMove={draw}
		/>
	);
}
