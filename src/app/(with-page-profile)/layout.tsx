import { CookiesProvider } from 'next-client-cookies/server';
import { ReactNode } from 'react';
import Profile from '../components/profile/profile';

export default function Layout({ children }: { children: ReactNode }) {
	
	return (
		<div>
			<CookiesProvider>
				<Profile />
				{children}
			</CookiesProvider>
		</div>
	);
}
