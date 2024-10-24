export interface RequestSignIn {
	userId: string;
	userPw: string;
}

export interface ResponseSignIn {
	accessToken: string;
	refreshToken: string;
	userName: string;
	userAuth: number;
	userProfileUrl: string;
	userProfileName: string;
}

export interface RequestSignUp {
	userId: string;
	userPw: string;
	userName: string;
}
