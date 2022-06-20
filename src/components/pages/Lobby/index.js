import React, { useMemo, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import useCreateRoom from '../../../utils/useCreateRoom';
import SweetAlert from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';

const GET_ROOMS = gql`
	query {
		rooms {
			title
			name
			playersOnline
		}
	}
`;

export default function Lobby() {
	const [modal, setModal] = useState(false);
	const username = localStorage.getItem('pinturilloUser');
	const { loading, error, data } = useQuery(GET_ROOMS);
	const { roomData, roomError, roomFucn } = useCreateRoom();
	const navigate = useNavigate();
	const rooms = useMemo(() => {
		if (!loading) return data.rooms;
	}, [data]);

	useEffect(() => {
		console.log(roomData, roomError);
	}, [roomData]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error{`${error}`}</p>;

	return (
		<Container fluid>
			<Row>
				<Col>
					<h2
						style={{
							color: '#fff',
							fontWeight: 'bold',
							fontSize: '50px',
						}}
						className="text-center p-4"
					>
						Rooms
					</h2>
				</Col>
			</Row>
			<Row>
				{!loading && data && (
					<div className="p-5">
						{rooms.map((room, index) => {
							const roomId = room.name;
							return (
								<Card key={index}>
									<Card.Body>
										<div className="d-flex justify-content-between align-items-center">
											<div>
												<div className="d-flex">
													<p className="fw-bold me-3">
														Name:{' '}
													</p>
													<p> {room.title}</p>
												</div>
												<p>
													Players Online:{' '}
													{room.playersOnline}
												</p>
											</div>
											<div>
												<Button
													onClick={() => {
														navigate('/game', {
															state: {
																room: roomId,
																username:
																	username,
															},
														});
													}}
													variant="warning"
												>
													Join
												</Button>
											</div>
										</div>
									</Card.Body>
								</Card>
							);
						})}
					</div>
				)}
			</Row>
			<Row>
				<Col className='d-flex justify-content-end'>
					<div className="mx-3 px-3 d-flex justify-content-end ">
						<Button onClick={() => navigate('/drawings')}>
							My Drawings
						</Button>
					</div>
					<div className="mx-3 px-3 d-flex justify-content-end ">
						<Button onClick={() => setModal(true)}>
							Create Room
						</Button>
					</div>
				</Col>
			</Row>
			<Modal onHide={() => setModal(false)} show={modal}>
				<Modal.Header closeButton>New Room</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={{
							title: '',
							name: '',
							playersOnline: 0,
						}}
						onSubmit={async (values) => {
							try {
								await roomFucn(values);
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
							<label className="form-label">Title:</label>
							<Field
								type="text"
								name="title"
								className="form-control"
								placeholder="Title"
							/>
							<label className="form-label">KeyName:</label>
							<Field
								type="text"
								name="name"
								className="form-control"
								placeholder="KeyName"
							/>
						</Form>
					</Formik>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setModal(false)} variant="secondary">
						Close
					</Button>
					<Button type="submit" form="formRoom">
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}
