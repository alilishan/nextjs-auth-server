/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		config.module.rules.push({
			test: /\.key$/i,
			use: ['raw-loader'],
		})

		config.module.rules.push({
			test: /\.pub$/i,
			use: ['raw-loader'],
		})

		return config
	},

	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		// ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig
