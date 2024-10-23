'use client';

import Link from 'next/link';
import style from './header.module.css';

export default function Header() {
	const blogTitle = "Sangkyun's blog";

	return (
		<div className={style.container}>
			<div className={style.title}>
				<Link href={'/'}>
					<span className={style.blogTitle}>{blogTitle}</span>
				</Link>
			</div>
			<div className={style.menu}>
				<Link href={'/'}>Tech</Link>
				<Link href={'/'}>Info</Link>
			</div>
		</div>
	);
}
