'use client';

import React, { useState } from 'react';
import { loginAction } from '@/app/actions/user/login-action';
import { useCookies } from 'next-client-cookies';

export default function Page() {
	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	const cookie = useCookies();

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { data } = await loginAction(userId, userPw);

		console.log(data);

		const accessToken = data.accessToken;
		const refreshToken = data.refreshToken;

		cookie.set(
			'token',
			JSON.stringify({
				accessToken: accessToken,
				refreshToken: refreshToken,
			}),
		);
	};

	return (
		<div>
			<h1>로그인</h1>
			<form onSubmit={login}>
				<input
					type="text"
					name="userId"
					value={userId}
					placeholder="아이디 입력"
					onChange={e => setUserId(e.target.value)}
				/>
				<input
					type="password"
					name="userPw"
					value={userPw}
					placeholder="비밀번호 입력"
					onChange={e => setUserPw(e.target.value)}
				/>
				<button type="submit">로그인</button>
			</form>
		</div>
	);
}
