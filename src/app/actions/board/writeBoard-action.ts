'use server';

import { cookies } from 'next/headers';
import { baseFetch } from '../base-fetch';
const writeBoardAction = async (_: any, formData: FormData) => {
	const userId = formData.get('userId')?.toString();
	const boardTitle = formData.get('boardTitle')?.toString();
	const boardContent = formData.get('boardContent')?.toString();
	const categoryNum = Number(formData.get('categoryNum'));
	const accessToken = cookies().get('accessToken');
	const refreshToken = cookies().get('refreshToken');

	if (!userId || !boardTitle || !boardContent || !categoryNum) {
		return { status: false, error: '리뷰 내용과 작성자를 입력해주세요' };
	}

	try {
		const response = await baseFetch(`/api/board/write`, {
			method: 'POST',
			body: JSON.stringify({ userId, boardTitle, boardContent, categoryNum }),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
			},
		});

		console.log('글작성 fetch 결과 : ', response);

		if (!response.ok) {
			return {
				status: false,
				error: '401',
				message: '로그인이 필요합니다.',
			};
		}
		return {
			status: true,
			error: '',
			message: '글 작성에 성공했습니다.',
		};
	} catch (err) {
		console.log('catch문 에러 : ', err);
		return {
			status: false,
			error: `글 작성에 실패했습니다 : ${err}`,
			message: '',
		};
	}
};

export { writeBoardAction };
