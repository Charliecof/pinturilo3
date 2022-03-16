import React from 'react';
import PropTypes from 'prop-types';
export default function Message({ user, content }) {
	return (
		<div className="d-flex">
			<p style={{color:'#5b7dcf'}}>{user}: <span style={{color:'#000'}}>{content}</span> </p>
		</div>
	);
}

Message.propTypes = {
	user: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
