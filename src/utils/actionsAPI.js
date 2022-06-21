import axios from 'axios';

const url = 'http://localhost:8000/api/token/';

const getToken = async (values) => {
	const data = await axios.post(url, values);
	return data.data;
};

const verifyToken = (cName) => {
	const name = cName + '=';
	const cDecoded = decodeURIComponent(document.cookie);
	const cookieArray = cDecoded.split(';');
	let res;
	cookieArray.forEach((val) => {
		if (val.indexOf(name) === 0) res = val.substring(name.length);
	});
	console.log(res);
	return res;
	
};

export { getToken, verifyToken };
