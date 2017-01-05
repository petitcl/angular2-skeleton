const env = process.env.NODE_ENV || 'development';
const utils = require('./webpack/utils');

const config = utils.loadConfigFile(env, __dirname + '/conf');
config.env = config.env || {};
config.env.NODE_ENV = env;

switch (env) {
	case "integration":
	case "validation":
	case "preproduction":
	case "production":
		module.exports = require('./webpack/webpack.prod')(env, config);
		break;
	case "test":
		module.exports = require('./webpack/webpack.test')(env, config);
		break;
	default:
	case "development":
		module.exports = require('./webpack/webpack.dev')(env, config);
		break;
}
