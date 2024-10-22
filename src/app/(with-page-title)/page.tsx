'use client';

import { useActionState, useEffect } from 'react';
import { loginAction } from '../actions/user-actions';

export default function Page() {
	const [state, formAction, isPending] = useActionState(loginAction, null);

	useEffect(() => {
		if (state && !state.status) {
			alert(state.error);
		}
	}, [state]);
	return (
		<div>
			<h1>로그인 테스트</h1>
			<form action={formAction}>
				<input type="text" name="userId" placeholder="아이디 입력" />
				<input type="password" name="userPw" placeholder="비밀번호 입력" />
				<button type="submit">로그인</button>
			</form>
		</div>
	);
}
