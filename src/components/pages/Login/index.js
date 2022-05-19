import React from "react";
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { schema } from "../../../utils/loginSchema";
import './styles.css'

const Login = ({ handleSubmit }) => {
	return (
		<Formik
			validationSchema={schema}
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={(values) => handleSubmit(values)}
		>
			<Form>
				<label className="form-label">Email:</label>
				<Field
					type="mail"
					name="email"
					className="form-control"
					placeholder="Email"
				/>
				<ErrorMessage name="email">
					{(errorMessage) => <p className="text-danger">{errorMessage}</p>}
				</ErrorMessage>

				<label className="form-label">Password: </label>
				<Field
					type="password"
					name="password"
					className="form-control"
					placeholder="********"
				/>
				<ErrorMessage name="password">
					{(errorMessage) => <p className="text-danger">{errorMessage}</p>}
				</ErrorMessage>
				<button type="submit" className="btn btn-primary mt-4 buttonSubmit">
					Log In
				</button>
			</Form>
		</Formik>
	);
};

export default Login;

Login.propTypes = {
	handleSubmit: PropTypes.func
}
