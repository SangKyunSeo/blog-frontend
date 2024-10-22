'use server';

import { cookies } from 'next/headers';

const setCookie = async (key: string, value: string) => {
	cookies().set(key, value, { expires: 30 });
};

const getCookie = async (key: string) => {
	return cookies().get(key)?.value;
};

const clearCookie = async () => {
	cookies().delete('access_token');
	cookies().delete('refresh_token');
};

export { setCookie, getCookie, clearCookie };
