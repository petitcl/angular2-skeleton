module.exports = function (env, conf) {
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const path = require('path');
	const webpack = require('webpack');
	const DefinePlugin = require('webpack/lib/DefinePlugin');
	const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
	const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
	const CopyWebpackPlugin = require('copy-webpack-plugin');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		debug: true,
		entry: {
			app: [ path.resolve(rootDir, app, 'main') ],
			vendor: [ path.resolve(rootDir, app, 'vendor') ],
			css: [ path.resolve(rootDir, app, 'app-module.scss')]
		},
		module: {
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
					loader: ExtractTextPlugin.extract('css!sass')
				},
				{
					test: /\.(png|jpe?g|gif|ico)$/,
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
			new UglifyJsPlugin({
				comments: false
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
			])
		],
		resolve: {
			extensions: [ '', '.js', '.ts' ]
		}
	};
};
