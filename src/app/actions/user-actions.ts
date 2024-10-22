'use client';

import axiosClient from '../common/axios/axios-client';

export async function loginAction(_: any, formData: FormData) {
	const userId = formData.get('userId')?.toString();
	const userPw = formData.get('userPw')?.toString();

	if (!userId || !userPw)
		return { status: false, error: '아이디와 비밀번호를 입력하세요!' };

	try {
		const data = await axiosClient
			.post('http://localhost:3000/next/api/user/login', {
				userId: userId,
				userPw: userPw,
			})
			.then(res => {
				console.log(res);
				return { status: true, error: '' };
			});
	} catch (err) {
		console.error(err);
		return { status: false, error: 'text' }; // 성공 시 반환
	}
}
