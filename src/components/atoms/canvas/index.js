import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaEraser, FaPencilAlt } from 'react-icons/fa';
import './styles.css';
import socketIOClient from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SweetAlert from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';


const ENDPOINT = 'http://194.195.219.130:4000';
const SAVE_DRAWING = gql`
	mutation SaveDrawing($name: String!, $data: String!) {
		createDrawing(name: $name, data: $data) {
			drawing {
				id
				name
				data
				owner {
					username
				}
			}
		}
	}
`;

export default function Canvas({ objeto, roomID, message, setMessages }) {
	const [saveDrawing, { loading, error, data }] = useMutation(SAVE_DRAWING);
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setDrawing] = useState(false);
	const [prevColor, setPrevColor] = useState('black');
	const [color, setColor] = useState('black');
	const [width, setWidth] = useState(1);
	const [tool, setTool] = useState('pencil');
	const [socket, setSocket] = useState(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [modal,setModal] = useState(false);
	const navigate = useNavigate()
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

	useEffect(() => {
		if (socket) socket.emit('chat', { room: roomID, message: message });
	}, [message]);

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
				canvasData: {
					x0: x0,
					y0: y0,
					x1: x1,
					y1: y1,
					color: color,
					brush_width: brush_width,
				},
				room: roomID,
			});
		}
	};

	useEffect(() => {
		const socketAux = socketIOClient(ENDPOINT);
		socketAux.emit('join', roomID);
		socketAux.on('draw', () => console.log('dibujando'));
		socketAux.on('receiveChat', (data) => {
			console.log('Chat', data);
			setMessages((prev) => {
				prev = [...prev, { message: data.message, user: data.user }];
				return prev;
			});
		});
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

	useEffect(()=>{
		console.log(loading,error,data);
	},[data])

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
		setPrevColor(color);
		setColor('#fff');
	};

	const selectPencil = () => {
		setTool('pencil');
		setColor(prevColor);
	};

	const changeColor = (e) => {
		setColor(() => e.target.value);
	};

	const changeWidth = (e) => {
		setWidth(e.target.value);
	};

	const saveCanvasData = async (values) => {
		try {
			const dataURL = canvasRef.current.toDataURL();
			values.data=dataURL
			await saveDrawing({ variables: values });
		} catch (error) {
			await SweetAlert.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Server Error',
				showConfirmButton: false,
				timer: 1500,
			});
		}
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
				className="d-flex justify-content-around align-items-center"
			>
				<p className="p-3">{objeto}</p>
				<div>
					<Button onClick={()=>setModal(true)}>Save Drawing</Button>
				</div>
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
			<Modal onHide={() => setModal(false)} show={modal}>
				<Modal.Header closeButton>Save Drawing</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={{
							name: '',
							data: ''
						}}
						onSubmit={async (values) => {
							try {
								await saveCanvasData(values);
								await SweetAlert.fire({
									position: 'top-end',
									icon: 'success',
									title: 'Created Succesfully',
									showConfirmButton: false,
									timer: 1000,
								});
								navigate('/');
							} catch (error) {
								console.error(error);
								await SweetAlert.fire({
									position: 'top-end',
									icon: 'error',
									title: 'Server Error',
									showConfirmButton: false,
									timer: 1500,
								});
							}
						}}
					>
						<Form id="formRoom">
							<label className="form-label">Drawing Name:</label>
							<Field
								type="text"
								name="name"
								className="form-control"
								placeholder="Drawing Name"
							/>
							
						</Form>
					</Formik>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setModal(false)} variant="secondary">
						Close
					</Button>
					<Button type="submit" form="formRoom">
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

Canvas.propTypes = {
	objeto: PropTypes.string.isRequired,
};
