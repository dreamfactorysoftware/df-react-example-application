import axios from 'axios';

const http = axios.create({
	baseURL: window.appConfig.INSTANCE_URL,
})

export default http;