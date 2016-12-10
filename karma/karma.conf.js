'use strict';

module.exports = config => {
	config.set({
		basePath: '',
		autoWatch: true,
		browsers: ['PhantomJS'],
		files: [ { pattern: 'karma.entry.js', watched: false } ],
		frameworks: ['jasmine'],
		logLevel: config.LOG_INFO,
		phantomJsLauncher: {
			exitOnResourceError: true
		},
		port: 9876,
		preprocessors: {
			'karma.entry.js': ['coverage', 'webpack', 'sourcemap']
		},
		coverageReporter: {
			type: 'in-memory'
		},
		remapCoverageReporter: {
			'text-summary': null,
			json: './coverage/coverage.json',
			html: './coverage/html'
		},
		reporters: [ 'mocha', 'coverage', 'remap-coverage' ],
		singleRun: true,
		webpack: require('../webpack/webpack.test.js')("test", {}),
		webpackServer: {
			stats: 'errors-only',
			noInfo: true
		},
		// Webpack please don't spam the console when running in karma!
		webpackMiddleware: { stats: 'errors-only'},
	});
};