'use client';

import { useCookies } from 'next-client-cookies';
import React, { useEffect, useState } from 'react';
import Logged from './logged';
import UnLogged from './un-logged';
import { tokenInfo } from '@/types/token';
import LoginModal from '../modal/signInModal';

export default function Profile() {
	const cookie = useCookies();

	const [isLogged, setIsLogged] = useState(false);

	const [isShow, setIsShow] = useState(false);

	const userName = cookie.get('name') || null;

	useEffect(() => {
		const cookieToken = cookie.get('token') || null;

		if (cookieToken) {
			const token: tokenInfo = JSON.parse(cookieToken);
			if (token.accessToken != null) setIsLogged(true);
			else setIsLogged(false);
		}
	}, []);

	return (
		<div>
			<div>
				{isLogged ? (
					<Logged userName={userName!} />
				) : (
					<UnLogged setIsShow={setIsShow} />
				)}
			</div>
			<div>
				{isShow && (
					<LoginModal setIsShow={setIsShow} setIsLogged={setIsLogged} />
				)}
			</div>
		</div>
	);
}
