import style from './un-logged.module.css';

export default function UnLogged(props: loginModalProps) {
	const setShowModalState = () => {
		props.setIsShow(true);
	};

	return (
		<div className={style.container}>
			<div className={style.welcomComment}>
				환영합니다. 서상균의 블로그입니다.
			</div>
			<div className={style.loginButton}>
				<span onClick={setShowModalState}>로그인하러 가기</span>
			</div>
		</div>
	);
}

interface loginModalProps {
	setIsShow: (value: boolean) => void;
}
