'use strict';

module.exports = function (env, conf) {
	const deepExtend = require('deep-extend');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
	const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
	const IgnorePlugin = require('webpack/lib/IgnorePlugin');
	const CopyWebpackPlugin = require('copy-webpack-plugin');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');
	const ProgressBarPlugin = require('progress-bar-webpack-plugin');
	const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
	const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
	var CleanWebpackPlugin = require('clean-webpack-plugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		devtool: 'source-map',
		entry: {
			app: [path.resolve(rootDir, app, 'main')],
			vendor: [path.resolve(rootDir, app, 'vendor')],
			css: [ path.resolve(rootDir, app, 'app.module.scss')]
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					enforce: 'pre',
					loader: 'tslint-loader'
				},
				{
					test: /\.html$/,
					exclude: /index\.html/,
					loader: 'raw-loader'
				},
				{
					use: [
						'awesome-typescript-loader',
						'angular2-template-loader',
						'angular2-router-loader'
					],
					test: /\.ts$/,
					exclude: /node_modules/
				},
				{
					test: /\.scss$/,
					use: [
						'raw-loader',
						'sass-loader?sourceMap'
					],
					exclude: /app\.module\.scss$/
				},
				{
					test: /app\.module\.scss$/,
					use: ExtractTextPlugin.extract({
						use: [
							'css-loader?sourceMap',
							'sass-loader?sourceMap'
						]
					})
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
			path: path.resolve(rootDir, dist),
			publicPath: !!conf.env.baseUrl ? conf.env.baseUrl :  undefined
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
				template: path.resolve(rootDir, app, 'index.html'),
				env: conf.env
			}),
			new ExtractTextPlugin({
				filename: "styles.css",
				disable: false,
				allChunks: true
			}),
			new LoaderOptionsPlugin({
				debug: false
			}),
			new ContextReplacementPlugin(
				/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
				__dirname
			),
			new DefinePlugin({
				'process.env': JSON.stringify(conf.env || {})
			}),
			new CopyWebpackPlugin([
				{ context: app, from: "**/*.+(png|jpeg|jpg|gif|ico|svg)" }
			]),
			new CopyWebpackPlugin([
				{ context: app, from: "translations", to: "translations" }
			]),
			new ProgressBarPlugin(),
			new HotModuleReplacementPlugin(),
			//ignore moment locales
			new IgnorePlugin(/^\.\/locale$/, /moment$/),
			//prevent from importing lodash$ global module
			new IgnorePlugin(/^lodash$/),
			//prevent from importing rxjs global module
			new IgnorePlugin(/^rxjs$/),
			new CleanWebpackPlugin([dist], {
				root: rootDir
			})
		],
		resolve: {
			extensions: ['.js', '.ts', '.scss']
		},
		devServer: deepExtend(
			{},
			{
				inline: true,
				noInfo: true,
				historyApiFallback: true
			},
			conf.webpackDevServer || {}
		)
	};
};
