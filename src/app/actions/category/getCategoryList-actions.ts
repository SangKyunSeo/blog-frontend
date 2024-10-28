'use server';

import { baseFetch } from '../base-fetch';

const getCategoryListAction = async () => {
	const response = await baseFetch('/api/category/list', {
		method: 'GET',
	});

	const responseData = await response.json();
	return responseData;
};

export { getCategoryListAction };
