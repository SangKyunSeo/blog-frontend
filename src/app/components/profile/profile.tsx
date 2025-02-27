'use client';

import { useCookies } from 'next-client-cookies';
import React, { useEffect, useState } from 'react';
import Logged from './logged';
import UnLogged from './un-logged';
import SignInModal from '../modal/signInModal';
import SignUpModal from '../modal/signUpModal';

export default function Profile() {
	const cookie = useCookies();

	const [isLogged, setIsLogged] = useState(false);

	const [isSignInModal, setIsSignInModal] = useState(false);
	const [isSignUpModal, setIsSignUpModal] = useState(false);

	const userName = cookie.get('name') || null;
	const userAuth = Number(cookie.get('auth'));
	console.log('cookie에서 꺼내온 name ', userName);
	console.log('cookie에서 꺼내온 auth ', userAuth);

	useEffect(() => {
		const accessToken = cookie.get('accessToken') || null;

		if (accessToken != null) setIsLogged(true);
		else setIsLogged(false);
	}, []);

	return (
		<div>
			<div>
				{isLogged ? (
					<Logged userName={userName!} userAuth={userAuth!} />
				) : (
					<UnLogged
						setIsSignInModal={setIsSignInModal}
						setIsSignUpModal={setIsSignUpModal}
					/>
				)}
			</div>
			<div>
				{isSignInModal && !isSignUpModal && (
					<SignInModal
						setIsSignInModal={setIsSignInModal}
						setIsLogged={setIsLogged}
						setIsSignUpModal={setIsSignUpModal}
					/>
				)}
				{isSignUpModal && !isSignInModal && (
					<SignUpModal
						setIsSignUpModal={setIsSignUpModal}
						setIsSignInModal={setIsSignInModal}
					/>
				)}
			</div>
		</div>
	);
}
