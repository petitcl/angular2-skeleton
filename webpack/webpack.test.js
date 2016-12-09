'use strict';

module.exports = function (env, conf) {
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		debug: true,
		devtool: 'inline-source-map',
		entry: {
			app: [path.resolve(rootDir, app, 'main')],
			vendor: [path.resolve(rootDir, app, 'vendor')],
			css: [ path.resolve(rootDir, app, 'app-module.scss')]
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
					loader: 'raw',
					test: /\.(css|html)$/
				},
				{
					loader: 'ts',
					test: /\.ts$/,
					exclude: /node_modules/
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
				},
				{
					test: /\.(png|jpe?g|gif|ico|svg)$/,
					loader: 'file-loader?name=[name].[hash].[ext]'
				},
				{
					test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url-loader?limit=10000&mimetype=application/font-woff'
				},
				{
					test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url-loader?limit=10000&mimetype=application/font-woff'
				},
				{
					test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
				},
				{
					test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader'
				},
				{
					test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
				}
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
		'ts': {
			logLevel: 'warn'
		}
	};
};

