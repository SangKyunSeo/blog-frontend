import returnFetch, { FetchArgs, ReturnFetch } from 'return-fetch';
import { cookies } from 'next/headers';

const fetchExtend: ReturnFetch = args =>
	returnFetch({
		...args,
		interceptors: {
			request: async (args: FetchArgs) => {
				const token = cookies().get('token');
				console.log(token);
				return args;
			},
			response: async response => {
				if (!response.ok) {
					return response;
				}
				return response;
			},
		},
	});

export { fetchExtend };
