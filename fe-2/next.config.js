const { dependencies } = require('./package.json');
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config, options) => {
		// webpack configurations
		config.plugins.push(
			new options.webpack.container.ModuleFederationPlugin({
				name: 'fe2',
				filename: 'static/chunks/remoteEntry.js', // remote file name which will used later
				exposes: {
					// expose all component here.
					'./com-header': './components/com-converter-asciidoc.tsx',
				},
				shared: {
					...dependencies,
					react: {
						singleton: true,
						requiredVersion: false,
						eager: true,
					},
					'react-dom': {
						singleton: true,
						requiredVersion: false,
						eager: true,
					},
					'next/link': {
						requiredVersion: false,
						singleton: true,
						eager: true,
					},
					'next/router': {
						requiredVersion: false,
						singleton: true,
						eager: true,
					},
				},
			})
		);
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		config.optimization = {
			...config.optimization,
			runtimeChunk: false,
			splitChunks: false,
		};
		config.output = {
			...config.output,
			publicPath: 'auto',
			uniqueName: 'fe2',
		};

		return config;
	},
};

module.exports = nextConfig;
