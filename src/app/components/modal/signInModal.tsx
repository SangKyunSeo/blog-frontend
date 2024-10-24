'use client';

import { loginAction } from '@/app/actions/user/login-action';
import { useCookies } from 'next-client-cookies';
import React, { useState } from 'react';
import style from './signInModal.module.css';

export default function SignInModal(props: loginModalProps) {
	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');
	const cookie = useCookies();

	const closeModal = () => {
		props.setIsSignInModal(false);
	};

	const showSignUpModal = () => {
		props.setIsSignInModal(false);
		props.setIsSignUpModal(true);
	};

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (userId === null || userId === '' || userPw === null || userPw === '') {
			alert('아이디와 비밀번호를 입력하세요!');
			return;
		}

		try {
			const { data } = await loginAction(userId, userPw);

			cookie.set('name', data.userName);
			cookie.set('auth', data.userAuth.toString());

			props.setIsLogged(true);
			closeModal();
		} catch (err) {
			console.log(err);
			setUserId('');
			setUserPw('');
		}
	};
	return (
		<div className={style.container} onClick={closeModal}>
			<div className={style.modal} onClick={e => e.stopPropagation()}>
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
					<button className={style.signInBtn} type="submit">
						로그인
					</button>
					<button
						className={style.signUpBtn}
						type="button"
						onClick={showSignUpModal}
					>
						회원가입
					</button>
				</form>
			</div>
		</div>
	);
}

interface loginModalProps {
	setIsSignInModal: (value: boolean) => void;
	setIsLogged: (value: boolean) => void;
	setIsSignUpModal: (value: boolean) => void;
}
