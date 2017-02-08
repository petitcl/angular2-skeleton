'use strict';

module.exports = function (env, conf) {
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const deepExtend = require('deep-extend');
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
	const CopyWebpackPlugin = require('copy-webpack-plugin');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');
	const ProgressBarPlugin = require('progress-bar-webpack-plugin');
	const IgnorePlugin = require('webpack/lib/IgnorePlugin');
	const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
	const extractRootCss = new ExtractTextPlugin("styles.css");

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		debug: false,
		devtool: 'source-map',
		entry: {
			app: [path.resolve(rootDir, app, 'main')],
			vendor: [path.resolve(rootDir, app, 'vendor')],
			css: [ path.resolve(rootDir, app, 'app.module.scss')]
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
						'awesome-typescript-loader',
						'angular2-template-loader',
						'angular2-router-loader'
					],
					test: /\.ts$/,
					exclude: /node_modules/
				},
				{
					test: /\.scss$/,
					loaders: [
						'raw-loader',
						'sass-loader?sourceMap'
					],
					exclude: /app\.module\.scss$/
				},
				{
					test: /app\.module\.scss$/,
					loader: extractRootCss.extract('css?sourceMap!sass?sourceMap')
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
			extractRootCss,
			new DefinePlugin({
				'process.env': JSON.stringify(conf.env || {})
			}),
			new CopyWebpackPlugin([
				{ context: app, from: "**/*.+(png|jpeg|jpg|gif|ico|svg)" }
			]),
			new CopyWebpackPlugin([
				{ context: app, from: "translations", to: "translations" }
			]),
			new ProgressBarPlugin(),
			new HotModuleReplacementPlugin(),
			//prevent from importing lodash global module
			new IgnorePlugin(/^lodash$/),
			//prevent from importing rxjs global module
			new IgnorePlugin(/^rxjs$/)
		],
		resolve: {
			extensions: ['', '.js', '.ts']
		},
		/**
		 * merge with conf from env files
		* */
		devServer: deepExtend(
			{},
			{
				inline: true,
				noInfo: true,
				historyApiFallback: true
			},
			conf.webpackDevServer || {}
		),
		ts: {
			logLevel: 'warn'
		}
	};
};

