import { CookiesProvider } from 'next-client-cookies/server';
import { ReactNode } from 'react';
import Profile from '../components/profile/profile';
import style from './layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div>
			<CookiesProvider>
				<Profile />
				<div className={style.container}>{children}</div>
			</CookiesProvider>
		</div>
	);
}
