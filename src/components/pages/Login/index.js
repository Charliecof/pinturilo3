import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = () => {
	const navigate = useNavigate();

	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
				<div className="measure">
					<fieldset id="login" className="ba b--transparent ph0 mh0">
						<legend className="f2 fw6 ph0 mh0 center">
							Log In
						</legend>
						<div className="mt3">
							<label
								className="db fw6 lh-copy f6"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="email"
								name="email"
								id="email"
							/>
						</div>
						<div className="mv3">
							<label
								className="db fw6 lh-copy f6"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
								type="password"
								name="password"
								id="password"
							/>
						</div>
					</fieldset>
					<div className="">
						<input
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Log in"
						/>
					</div>
					<div className="lh-copy mt3">
						<input
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Register"
							onClick={() => {
								navigate('/register');
							}}
						/>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Login;
