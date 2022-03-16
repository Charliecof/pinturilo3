import React from 'react';

import './styles.css';

const Login = () => {


	return (
		<article className="">
			<main className="hola">
				<div className="measure">
					<fieldset id="login" className="">
						<legend className="f2 fw6 ph0 mh0 center">
							Log In
						</legend>
						<div className="mt3">
							<label
								className=""
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="form-control"
								type="email"
								name="email"
								id="email"
							/>
						</div>
						<div className="mv3">
							<label
								className=""
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="form-control"
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
							
						/>
					</div>
				</div>
			</main>
		</article>
	);
};

export default Login;
