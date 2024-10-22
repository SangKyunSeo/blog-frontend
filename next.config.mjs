/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/next/api/:path*',
				destination: 'http://localhost:8080/api/:path*',
			},
		];
	},
};

export default nextConfig;
