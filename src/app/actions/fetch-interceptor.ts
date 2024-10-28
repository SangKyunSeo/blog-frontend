import returnFetch, { FetchArgs, ReturnFetch } from 'return-fetch';
import { cookies, headers } from 'next/headers';

const fetchExtend: ReturnFetch = args =>
	returnFetch({
		...args,
		interceptors: {
			request: async (args: FetchArgs) => {
				const accessToken = cookies().get('accessToken');
				console.log(accessToken);
				console.log(args);
				return args;
			},
			response: async (response, requestArgs, fetch) => {
				if (!response.ok) {
					console.log('hehe ', response);
					const accessToken = cookies().get('accessToken');
					const refreshToken = cookies().get('refreshToken');

					const errorData = await response.json();
					console.log(`errorData code = ${errorData.code}`);
					console.log(`errorData message = ${errorData.message}`);

					if (response.status === 401) {
						console.log('토큰 재발급 요청');
						const res = await fetch(
							`${process.env.NEXT_PUBLIC_API_URL}/api/user/reIssue`,
							{
								method: 'POST',
								headers: {
									Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
								},
							},
						);
						const resData = await res.json();

						console.log(`재발급 결과 response = ${JSON.stringify(resData)}`);

						if (res.ok) {
							if (resData.code === '200') {
								const cookieList = res.headers
									.getSetCookie()
									.map(v => v.slice(0, v.indexOf(' ') - 1).split('='));

								cookieList.forEach(cookie =>
									cookies().set(cookie[0], cookie[1].toString()),
								);

								const newAccessToken = cookies().get('accessToken');
								const newRefreshToken = cookies().get('refreshToken');
								const [url, options] = requestArgs;
								const updateOptions = {
									...options,
									headers: {
										...options?.headers,
										Cookie: `${newAccessToken?.name}=${newAccessToken?.value}; ${newRefreshToken?.name}=${newRefreshToken?.value}`,
										'Content-Type': 'application/json',
									},
								};

								return fetch(url, updateOptions);
							}
						} else {
							cookies().delete('accessToken');
							cookies().delete('refreshToken');
							cookies().delete('name');
							cookies().delete('auth');
							return response;
						}
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
