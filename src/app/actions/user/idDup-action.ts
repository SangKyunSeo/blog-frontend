'use server';

import { baseFetch } from '../base-fetch';

const idDupCheckAction = async (userId: string): Promise<comRes<boolean>> => {
	const response = await baseFetch('/api/user/idDup/check', {
		method: 'POST',
		body: JSON.stringify({ userId }),
	});

	const responseData = await response.json();
	return responseData;
};

export { idDupCheckAction };
