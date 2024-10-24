'use server';

import { MainBoard } from '@/types/board';
import { baseFetch } from '../base-fetch';

const getMainBoardListAction = async (): Promise<comRes<MainBoard[]>> => {
	const response = await baseFetch('/api/board/main/list', {
		method: 'GET',
	});

	const responseData = await response.json();
	return responseData;
};

export { getMainBoardListAction };
