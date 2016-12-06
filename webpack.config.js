const env = process.env.NODE_ENV || 'development';
const utils = require('./webpack/utils');

const config = utils.loadConfigFile(env, __dirname + '/conf');

switch (env) {
	case "integration":
	case "validation":
	case "preproduction":
	case "production":
		module.exports = require('./webpack/webpack.prod')(config);
		break;
	default:
	case "development":
		module.exports = require('./webpack/webpack.dev')(config);
		break;
}
