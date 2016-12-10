'use strict';

module.exports = function (env, conf) {
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';
	const node_modules = 'node_modules';

	return {
		devtool: 'inline-source-map',
		entry: {
			app: [path.resolve(rootDir, app, 'main')],
			vendor: [path.resolve(rootDir, app, 'vendor')]
		},
		resolve: {
			extensions: ['.js', '.ts'],
			modules: [ path.resolve(rootDir, 'app'), 'node_modules' ]
		},
		module: {
			loaders: [
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: 'source-map-loader',
					exclude: [
						// these packages have problems with their sourcemaps
						path.resolve(rootDir, node_modules, '/rxjs'),
						path.resolve(rootDir, node_modules, '/@angular')
					]
				},
				{
					test: /\.ts$/,
					loader: 'awesome-typescript-loader',
					query: {
						// use inline sourcemaps for "karma-remap-coverage" reporter
						sourceMap: false,
						inlineSourceMap: true,
						compilerOptions: {

							// Remove TypeScript helpers to be injected
							// below by DefinePlugin
							removeComments: true

						}
					},
					exclude: [/\.e2e\.ts$/]
				},
				{
					loader: 'raw-loader',
					test: /\.(html)$/
				},
				{
					enforce: 'post',
					test: /\.(js|ts)$/,
					loader: 'istanbul-instrumenter-loader',
					include: path.resolve(rootDir, 'app'),
					exclude: [
						/\.(e2e|spec)\.ts$/,
						/node_modules/
					]
				}
			]
		},
		output: {},
		plugins: [
			new DefinePlugin({
				'process.env': JSON.stringify(conf.env || {})
			}),
			new LoaderOptionsPlugin({
				debug: true,
				options: {
				}
			})
		]
	};
};

