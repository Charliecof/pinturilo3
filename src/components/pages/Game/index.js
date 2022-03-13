import Canvas from '../../atoms/canvas';
import React from 'react';

export default function index() {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col">Players..</div>
				<div className="col">
					<Canvas />
				</div>
				<div className="col">
					<input type="text" className="form-control m-5" />
				</div>
			</div>
		</div>
	);
}
