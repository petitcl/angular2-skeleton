'use strict';

module.exports = function (env, conf) {
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		devtool: 'inline-source-map',
		entry: {
			app: [path.resolve(rootDir, app, 'main')],
			vendor: [path.resolve(rootDir, app, 'vendor')]
		},
		resolve: {
			extensions: ['.js', '.ts'],
			modules: [ path.resolve(__dirname, 'app'), 'node_modules' ]
		},
		module: {
			loaders: [
				{
					enforce: 'pre',
					test: /\.ts$/,
					loader: 'tslint-loader'
				},
				{
					loader: 'awesome-typescript-loader',
					test: /\.ts$/,
					exclude: /node_modules/
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

