import axios from "axios"

const url = 'http://localhost:8000/api/token/'

const getToken = async (values)=>{
	const data = await axios.post(url,values);
	return data.data;
}

export {getToken}