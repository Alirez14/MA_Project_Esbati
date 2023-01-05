const { dependencies } = require('./package.json');
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	/**
	//  * @param {import('webpack').Configuration} config
	//  * @param {import('next').NextConfig} options
	//  */
	// webpack: (config, options) => {
	// 	config.plugins.push(
	// 		new options.webpack.container.ModuleFederationPlugin({
	// 			name: 'fe1',
	// 			remotes: {
	// 				fe2: 'fe2@http://localhost:3001/_next/static/chunks/remoteEntry.js',
	// 			},

	// 			shared: {
	// 				...dependencies,
	// 				react: {
	// 					singleton: true,
	// 					requiredVersion: dependencies['react'],
	// 					eager: true,
	// 				},
	// 				'react-dom': {
	// 					singleton: true,
	// 					requiredVersion: dependencies['react-dom'],
	// 					eager: true,
	// 				},
	// 				'@tiptap/extension-bullet-list': {
	// 					singleton: true,
	// 					requiredVersion: dependencies['@tiptap/extension-bullet-list'],
	// 					eager: true,
	// 				},
	// 			},
	// 		})
	// 	);
	// 	return config;
	// },
};

module.exports = nextConfig;
