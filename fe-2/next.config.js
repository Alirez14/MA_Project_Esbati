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
