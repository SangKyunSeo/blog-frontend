import { fetchExtend } from './fetch-interceptor';

const baseFetch = fetchExtend({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		'Content-type': 'application/json',
	},
});

export { baseFetch };
