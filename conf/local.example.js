/**
 * Here you can specify your local specific config properties, like custom vhosts / filepaths.
 * This file is not added to git (it is in .gitignore)
 * If specified, the properties in this file will override *ALL* other properties.
 * Rename this file to local.js to get started !
*/

module.exports = {

	/**
	 * All properties in the env property will be available at runtime with the process.env variable,
	 * or alternatively with ConfigurationService
	 */
	env: {
		api: '/api'
	},

	/**
	 * The properties in the webpackDevServer property will be used to override the webpack dev server configuration
	 * (which is run by the watch:hmr command). You can specify any variable accepted by webpack-dev-server.
	 * See https://webpack.github.io/docs/webpack-dev-server.html.
	 * In this example, the dev server is configured to proxy all requests starting with /api to localhost:3000,
	 * and stripping the '/api' from the path
	 */
	webpackDevServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {'^/api' : ''}
			}
		}
	}
};
