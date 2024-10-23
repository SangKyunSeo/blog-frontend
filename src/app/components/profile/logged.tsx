import style from './logged.module.css';

export default function Logged(props: loggedProps) {
	const userName = props.userName;

	return (
		<div className={style.container}>
			<div className={style.name}>
				<span>{userName}</span>
			</div>
		</div>
	);
}

interface loggedProps {
	userName: string;
}
