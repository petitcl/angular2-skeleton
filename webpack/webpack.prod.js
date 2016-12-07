module.exports = function (conf) {
	const HtmlWebpack = require('html-webpack-plugin');
	const path = require('path');
	const webpack = require('webpack');
	const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
	const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

	const rootDir = path.resolve(__dirname, '..');
	const app = 'app';
	const dist = 'dist';

	return {
		debug: true,
		entry: {
			app: [ path.resolve(rootDir, app, 'main') ],
			vendor: [ path.resolve(rootDir, app, 'vendor') ]
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
					loaders: ["style-loader", "css-loader?minimize", "sass-loader"]
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					loader: 'file'
				}
			]
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(rootDir, dist)
		},
		plugins: [
			new ChunkWebpack({
				filename: 'vendor.bundle.js',
				minChunks: Infinity,
				name: 'vendor'
			}),
			new HtmlWebpack({
				filename: 'index.html',
				inject: 'body',
				template: path.resolve(rootDir, app, 'index.html')
			}),
			new UglifyJsPlugin({
				comments: false
			})
		],
		resolve: {
			extensions: [ '', '.js', '.ts' ]
		}
	};
};
