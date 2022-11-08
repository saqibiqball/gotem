import axios from 'axios';

const $host = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const $authHost = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const authInterceptor = (config) => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token')
			? localStorage.getItem('token')
			: sessionStorage.getItem('token');
		config.headers.authorization = `Bearer ${token}`;
	}

	return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
