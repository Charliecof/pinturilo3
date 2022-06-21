import React, { useEffect, useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import 'sweetalert2/src/sweetalert2.scss';


const GET_DRAWINGS = gql`
	query {
		drawingsUser {
			id
			name
			data
		}
	}
`;

export default function Drawings() {
	const { loading, error, data } = useQuery(GET_DRAWINGS);
	const images = useMemo(() => {
		if (loading) return;
		console.log(data.drawingsUser);
		const urls = [...data.drawingsUser];

		return urls;
	}, [data]);
	console.log(images, 'URLS');

	useEffect(() => {
		console.log(loading, error, data);
	}, [data]);
	return (
		!loading &&
		images && (
			<div style={{ width: '100%' }} className="d-flex p-5 flex-wrap justify-content-around">
				{images.map((image, index) => {
					return (
						<div
							style={{
								maxWidth: '30%',
								backgroundColor: '#fff',
							}}
							key={index}
							className="m-3"
						>
							<h5 className='text-center'>{image.name}</h5>
							<img style={{ width: '100%' }} src={image.data} />
						</div>
					);
				})}
			</div>
		)
	);
}
