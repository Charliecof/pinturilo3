import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInSchema } from '../../../utils/loginSchema';
import './styles.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SweetAlert from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';

const REGISTER_USER = gql`
	mutation register(
		$firstname: String!
		$lastname: String!
		$email: String!
		$username: String!
		$password: String!
	) {
		createPlayer(
			firstName: $firstname
			lastName: $lastname
			email: $email
			username: $username
			password: $password
		) {
			player {
				username
				email
				firstName
			}
		}
	}
`;

const Register = () => {
	const [register, { loading, error, data }] = useMutation(REGISTER_USER);
	const navigate = useNavigate()

	useEffect(() => {
		console.log(data, loading, error);
	}, [data]);

	return (
		<Formik
			validationSchema={signInSchema}
			initialValues={{
				firstname: '',
				lastname: '',
				email: '',
				username: '',
				password: '',
			}}
			onSubmit={async (values) => {
				try {
					await register({ variables: values });
					await SweetAlert.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Created successfully',
						showConfirmButton: false,
						timer: 1000,
					});
					navigate('/login')
				} catch (error) {
					await SweetAlert.fire({
						position: 'top-end',
						icon: 'error',
						title: 'Server ERROR',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			}}
		>
			<Form>
				<label className="form-label">Name:</label>
				<Field
					type="text"
					name="name"
					className="form-control"
					placeholder="Name"
				/>
				<ErrorMessage name="name">
					{(errorMessage) => (
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Lastname:</label>
				<Field
					type="text"
					name="lastname"
					className="form-control"
					placeholder="Lastname"
				/>
				<ErrorMessage name="lastname">
					{(errorMessage) => (
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Mail:</label>
				<Field
					type="mail"
					name="email"
					className="form-control"
					placeholder="Mail"
				/>
				<ErrorMessage name="email">
					{(errorMessage) => (
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Username:</label>
				<Field
					type="text"
					name="username"
					className="form-control"
					placeholder="Username"
				/>
				<ErrorMessage name="username">
					{(errorMessage) => (
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Password: </label>
				<Field
					type="password"
					name="password"
					className="form-control"
					placeholder="********"
				/>
				<ErrorMessage name="password">
					{(errorMessage) => (
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Confirm Password: </label>
				<Field
					type="password"
					name="cpassword"
					className="form-control"
					placeholder="********"
				/>
				<ErrorMessage name="cpassword">
					{(errorMessage) => (
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>
				<button
					type="submit"
					className="btn btn-primary mt-4 buttonSubmit"
				>
					Log In
				</button>
			</Form>
		</Formik>
	);
};

export default Register;
