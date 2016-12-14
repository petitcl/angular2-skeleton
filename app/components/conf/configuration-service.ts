import _set = require("lodash/set");
import _get = require("lodash/get");

export class ConfigurationService {
	private conf: any;

	constructor(baseConf?: any) {
		// console.log('am I being constructed');
		this.conf = baseConf || {};
	}

	get(key: string) {
		return _get(this.conf, key);
	}

	getAsString(key: string) {
		return <string>this.get(key);
	}

	set(key: string, value: any) {
		return _set(this.conf, key, value);
	}
}