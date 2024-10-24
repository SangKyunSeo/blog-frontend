'use server';

import { baseFetch } from '../base-fetch';

const signUpAction = async (
	userId: string,
	userPw: string,
	userName: string,
): Promise<comRes<null>> => {
	const response = await baseFetch('/api/user/signUp', {
		method: 'POST',
		body: JSON.stringify({ userId, userPw, userName }),
	});
	console.log(response);
	const responseData = await response.json();
	console.log(responseData);
	return responseData;
};

export { signUpAction };
