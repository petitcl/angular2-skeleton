'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;

const rootDir = path.resolve(__dirname, '..');
const app = 'app';
const dist = 'dist';

module.exports = {
	debug: true,
	devtool: 'source-map',
	entry: {
		app: [ path.resolve(rootDir, app, 'main') ],
		vendor: [ path.resolve(rootDir, app, 'vendor') ]
	},
	module: {
		loaders: [
			{ loader: 'raw', test: /\.(css|html)$/ },
			{ exclude: /node_modules/, loader: 'ts', test: /\.ts$/ }
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
		})
	],
	resolve: {
		extensions: [ '', '.js', '.ts' ]
	}
};
