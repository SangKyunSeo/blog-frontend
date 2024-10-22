import { ReactNode } from 'react';
import Footer from './components/global/footer';
import Header from './components/global/header';

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div>
					<Header />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
