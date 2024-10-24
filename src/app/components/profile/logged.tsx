import style from './logged.module.css';

export default function Logged(props: loggedProps) {
	const userName = props.userName;
	const userAuth = props.userAuth;

	return (
		<div className={style.container}>
			<div className={style.name}>
				<span>{userName}</span>
			</div>
			{userAuth !== 1 ? (
				<div className={style.masterMenu}>
				<span className={style.writeBoard}>글작성</span>
				<span className={style.configBlog}>블로그 관리</span>
			</div>
			): ''}
		</div>
	);
}

interface loggedProps {
	userName: string;
	userAuth: number;
}
