require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

const browserTesting = require('@angular/platform-browser-dynamic/testing');
const coreTesting = require('@angular/core/testing');

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

coreTesting.TestBed.resetTestEnvironment();
coreTesting.TestBed.initTestEnvironment(
	browserTesting.BrowserDynamicTestingModule,
	browserTesting.platformBrowserDynamicTesting()
);

/*
 * Ok, this is kinda crazy. We can use the context method on
 * require that webpack created in order to tell webpack
 * what files we actually want to require or import.
 * Below, context will be a function/object with file names as keys.
 * Using that regex we are saying look in ../src then find
 * any file that ends with spec.ts and get its path. By passing in true
 * we say do this recursively
 */
var testContext = require.context('../app', true, /\.spec\.ts/);

/*
 * get all the files, for each file, call the context function
 * that will require the file and load it up here. Context will
 * loop and require those spec files here
 */
function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

// requires and returns all modules that match
var modules = requireAll(testContext);
