const { dependencies } = require('./package.json');
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['images.pexels.com'],
	},
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	/**
	 * @param {import('webpack').Configuration} config
	 * @param {import('next').NextConfig} options
	 */
	webpack: (config, options) => {
		config.plugins.push(
			new options.webpack.container.ModuleFederationPlugin({
				name: 'fe1',
				remotes: {
					fe2: 'fe2@http://localhost:3001/_next/static/chunks/remoteEntry.js',
				},

				shared: {
					...addEagerDependencies(dependencies),
					react: {
						singleton: true,
						requiredVersion: dependencies.react,
						eager: true,
					},
					'react-dom': {
						singleton: true,
						eager: true,
						requiredVersion: dependencies['react-dom'],
					},
				},
			})
		);
		return config;
	},
};

const addEagerDependencies = (depList) => {
	const eagerDependencies = Object.keys(depList).filter((dep) => dep !== 'react' && dep !== 'react-dom');
	const list = {};
	eagerDependencies.forEach((dep) => {
		list[dep] = {
			singleton: true,
			eager: true,
			requiredVersion: dependencies[dep],
		};
	});
	return list;
};

module.exports = nextConfig;
