'use strict';

module.exports = function (env, conf) {
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
	const CopyWebpackPlugin = require('copy-webpack-plugin');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');
	const ProgressBarPlugin = require('progress-bar-webpack-plugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		debug: true,
		devtool: 'source-map',
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
					loaders: [
						'ts-loader',
						'angular2-template-loader',
						'angular2-router-loader?debug='
					],
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
			new CommonsChunkPlugin({
				filename: 'vendor.bundle.js',
				minChunks: Infinity,
				name: 'vendor'
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				inject: 'body',
				template: path.resolve(rootDir, app, 'index.html')
			}),
			new ExtractTextPlugin("styles.css", {
				allChunks: true
			}),
			new DefinePlugin({
				'process.env': JSON.stringify(conf.env || {})
			}),
			new CopyWebpackPlugin([
				{ context: app, from: "**/*.+(png|jpeg|jpg|gif|ico|svg)" }
			]),
			new CopyWebpackPlugin([
				{ context: app, from: "translations", to: "translations" }
			]),
			new ProgressBarPlugin()
		],
		resolve: {
			extensions: ['', '.js', '.ts']
		},
		'ts': {
			logLevel: 'warn'
		}
	};
};

