'use strict';

module.exports = function (env, conf) {
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		debug: false,
		devtool: 'inline-source-map',
		entry: {
			app: [path.resolve(rootDir, app, 'main')],
			vendor: [path.resolve(rootDir, app, 'vendor')]
		},
		module: {
			preLoaders: [
				{
					test: /\.ts$/,
					loader: 'tslint-loader'
				}
			],
			loaders: [
				{
					loader: 'raw-loader',
					test: /\.(css|html)$/
				},
				{
					loader: 'awesome-typescript-loader',
					test: /\.ts$/,
					exclude: /node_modules/
				},
			]
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(rootDir, dist)
		},
		plugins: [
			new DefinePlugin({
				'process.env': JSON.stringify(conf.env || {})
			})
		],
		resolve: {
			extensions: ['', '.js', '.ts']
		},
		ts: {
			logLevel: 'warn'
		}
	};
};

