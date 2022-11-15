module.exports = {
	basePath: '',
	reactStrictMode: true,
	images: {
		domains: [
			'localhost',
			process.env.NEXT_PUBLIC_API_URL.match(/(http(?:s)?:\/\/)(.*)/)[2],
			'stage.wprollers.com',
			'crowdfunding.dev.wprollers.com',
			'crowdfunding-app.dev.wprollers.com',
		],
		formats: ['image/webp'],
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};
