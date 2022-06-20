import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { schema } from '../../../utils/loginSchema';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import SweetAlert from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useEffect } from 'react';

const AUTH_USER = gql`
	mutation Login($username: String!, $password: String!) {
		tokenAuth(username: $username, password: $password) {
			token
			payload
		}
	}
`;

const Login = () => {
	const [login, { loading, error, data }] = useMutation(AUTH_USER);
	const navigate = useNavigate();
	useEffect(() => {
		console.log(data, loading, error);
	}, [data]);

	return (
		<Formik
			validationSchema={schema}
			initialValues={{
				username: '',
				password: '',
			}}
			onSubmit={async (values) => {
				try {
					await login({ variables: values });
					await SweetAlert.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Login successfully',
						showConfirmButton: false,
						timer: 1000,
					});
					localStorage.setItem('JWT', data.tokenAuth.token);
					localStorage.setItem('pinturilloUser',data.tokenAuth.payload.username)
					navigate('/');
				} catch (error) {
					await SweetAlert.fire({
						position: 'top-end',
						icon: 'error',
						title: 'Enter Valid Credentials',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			}}
		>
			<Form>
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

export default Login;

Login.propTypes = {
	handleSubmit: PropTypes.func,
};
