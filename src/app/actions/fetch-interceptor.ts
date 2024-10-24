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
					if (response.status === 401) {
					} else {
						return response;
					}
				}

				const cookieList = response.headers
					.getSetCookie()
					.map(v => v.slice(0, v.indexOf(' ') - 1).split('='));

				cookieList.forEach(cookie =>
					cookies().set(cookie[0], cookie[1].toString()),
				);

				return response;
			},
		},
	});

export { fetchExtend };
