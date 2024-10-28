import { Base64 } from 'js-base64';
export function getUserIdFromToken(accessToken: string) {
	const payload = accessToken.split('.')[1];
	const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
	const decodedPayload = Base64.decode(base64Url);

	const jsonPayload = JSON.parse(decodedPayload);
	console.log(jsonPayload);
	return jsonPayload.sub;
}
