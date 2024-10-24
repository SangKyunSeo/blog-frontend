import { useState } from 'react';
import style from './signUpModal.module.css';
import { signUpAction } from '@/app/actions/user/signup-action';
import { idDupCheckAction } from '@/app/actions/user/idDup-action';

export default function SignUpModal(props: signUpModalProps) {
	const closeModal = () => {
		props.setIsSignUpModal(false);
	};

	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');
	const [userPwChk, setUserPwChk] = useState('');
	const [userName, setUserName] = useState('');
	const [idDupCheck, setIdDupCheck] = useState(false);
	const [showWarn, setShowWarn] = useState(false);

	// 입력값 valid 체크 메서드
	const inputChk = (value: string): boolean => {
		if (value === null || value === '') return false;
		return true;
	};

	// userId 입력 onChange handler
	const handleInputIdCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
		if (showWarn) setShowWarn(false);

		setIdDupCheck(false);
	};

	// Id 중복 체크 메서드
	const checkUserIdDup = async () => {
		if (idDupCheck) return;

		if (userId === '' || userId === null) {
			alert('아이디를 입력하세요!');
			return;
		}

		try {
			const data = await idDupCheckAction(userId);
			setIdDupCheck(data.data);
			setShowWarn(!data.data);
		} catch (err) {
			console.log(err);
		}
	};

	// 회원가입 메서드
	const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!inputChk(userId) ||
			!inputChk(userPw) ||
			!inputChk(userPwChk) ||
			!inputChk(userName)
		) {
			alert('모든 입력이 필수입니다!');
			return;
		}

		if (userPw !== userPwChk) {
			alert('비밀번호가 일치하지 않습니다.');
			setUserPwChk('');
			return;
		}

		if (!idDupCheck) {
			alert('아이디 중복을 확인하세요!');
			return;
		}

		try {
			const response = await signUpAction(userId, userPw, userName);

			if (response.data) {
				alert('회원가입에 성공했습니다!');
				props.setIsSignUpModal(false);
				props.setIsSignInModal(true);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className={style.container} onClick={closeModal}>
			<div className={style.modal} onClick={e => e.stopPropagation()}>
				<h1>회원가입</h1>
				<form onSubmit={signUp}>
					<div className={style.areaInputId}>
						<div className={style.userInputArea}>
							<input
								type="text"
								name="userId"
								value={userId}
								placeholder="아이디 입력"
								onChange={e => handleInputIdCheck(e)}
							/>
							{showWarn && <span className={style.idDupWarn}>중복!</span>}
						</div>
						<div className={style.btnDupCheckArea}>
							<span
								className={`${idDupCheck ? style.btnSuccessDup : style.btnFailDup} ${idDupCheck ? style.noHover : ''}`}
								onClick={checkUserIdDup}
							>
								중복 확인
							</span>
						</div>
					</div>

					<input
						type="password"
						name="userPw"
						value={userPw}
						placeholder="비밀번호 입력"
						onChange={e => setUserPw(e.target.value)}
					/>
					<input
						type="password"
						name="userPwChk"
						value={userPwChk}
						placeholder="비밀번호 확인"
						onChange={e => setUserPwChk(e.target.value)}
					/>
					<input
						type="text"
						name="userName"
						value={userName}
						placeholder="닉네임 입력"
						onChange={e => setUserName(e.target.value)}
					/>
					<div className={style.btnGrp}>
						<button type="submit">확인</button>
						<button type="button" onClick={closeModal}>
							취소
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

interface signUpModalProps {
	setIsSignUpModal: (value: boolean) => void;
	setIsSignInModal: (value: boolean) => void;
}
