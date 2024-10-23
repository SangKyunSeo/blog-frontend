declare interface comRes<T> {
	code: string;
	message: string;
	data: T;
}

declare interface comReq<T> {
	useToken: boolean;
	data: T;
}
