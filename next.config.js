module.exports = {
	basePath: '',
	reactStrictMode: true,
	images: {
		domains: [
			'localhost',
			'https://gotem-5k0ypcayz-saqibiqball.vercel.app',
			'stingray-app-in3wv.ondigitalocean.app',
		],
		formats: ['image/webp'],
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};
