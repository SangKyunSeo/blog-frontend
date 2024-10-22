'use client';

import axios, { InternalAxiosRequestConfig } from 'axios';
import { clearCookie, getCookie, setCookie } from '../cookies/cookie';
import Router from 'next/router';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
	baseURL: baseUrl,
});

axiosClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig<{ headers: string }>) => {
		const auth_header = config.headers['x-auth-not-required'];
		if (auth_header) return config;

		const token = await getCookie('access_token');
		config.headers['Authorization'] = `Bearer ${token}`;

		return config;
	},
);

axiosClient.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		const { config, response } = error;
		if (
			config.url !== `/api/reIssue` ||
			response?.status !== 402 ||
			config.sent
		) {
			return Promise.reject(error);
		}

		config.sent = true;
		const token = await reIssueToken();
		if (token) config.headers['Authorization'] = `Bearer ${token}`;

		return axiosClient(config);
	},
);

const reIssueToken = async () => {
	try {
		await axiosClient.get(`/api/reIssue`).then(res => {
			setCookie('access_token', res.headers['Authorization']);

			if (res.headers['Refresh-Token']) {
				setCookie('refresh_token', res.headers['Refresh-Token']);
			}
		});

		return getCookie('access_token');
	} catch (error) {
		clearCookie();
		Router.push('/');
	}
};

export default axiosClient;
