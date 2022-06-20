import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_ROOM = gql`
	mutation AddRoom($name: String!, $playersOnline: Int!, $title: String!) {
		createRoom(name: $name, playersOnline: $playersOnline, title: $title) {
			room {
				name
				playersOnline
			}
		}
	}
`;
export default function useCreateRoom() {
	const [createRoom, { loading, error, data }] = useMutation(CREATE_ROOM);
	const mutateFunction = (values) => {
		createRoom({ variables: values });
	};
	return {
		roomFucn: mutateFunction,
		roomData: data,
		roomError: error,
		roomLoading: loading,
	};
}
