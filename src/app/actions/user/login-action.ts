'use server';

import { ResponseSignIn } from '@/types/sign';
import { baseFetch } from '../base-fetch';
const loginAction = async (
	userId: string,
	userPw: string,
): Promise<comRes<ResponseSignIn>> => {
	const response = await baseFetch('/api/user/signIn', {
		method: 'POST',
		body: JSON.stringify({ userId, userPw }),
	});
	const responseData = await response.json();

	return responseData;
};

export { loginAction };
