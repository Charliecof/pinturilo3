import React from 'react';
import { Formik,Form,Field, ErrorMessage } from 'formik'
import { signInSchema } from '../../../utils/loginSchema';
import './styles.css'

const Register = ({handleSubmit}) => {
	return (
		<Formik
			validationSchema={signInSchema}
			initialValues={{
				name: '',
				lastname: '',
				email:'',
				password:'',
				role:''
			}}
			onSubmit={(values)=>{
				handleSubmit(values)
			}}
		>
			<Form>
				<label className="form-label">Name:</label>
				<Field type="text" name="name" className="form-control" placeholder="Name" />
				<ErrorMessage name="name">
					{(errorMessage) =>(
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Lastname:</label>
				<Field type="text" name="lastname" className="form-control" placeholder="Lastname" />
				<ErrorMessage name="lastname">
					{(errorMessage) =>(
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Mail:</label>
				<Field type="mail" name="email" className="form-control" placeholder="Mail" />
				<ErrorMessage name="email">
					{(errorMessage) =>(
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Password: </label>
				<Field type="password" name="password" className="form-control" placeholder="********" />
				<ErrorMessage name="password">
					{(errorMessage)=>(
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>

				<label className="form-label">Confirm Password: </label>
				<Field type="password" name="cpassword" className="form-control" placeholder="********" />
				<ErrorMessage name="cpassword">
					{(errorMessage)=>(
						<p className="text-danger">{errorMessage}</p>
					)}
				</ErrorMessage>
                
				<label className="form-label">Select Role: </label>
	
				<button type="submit" className="btn btn-primary mt-4 buttonSubmit" >Log In</button>
			</Form>
		</Formik>
	);
};

export default Register;
