import * as _ from "lodash";

export class ConfigurationService {
	private conf: any;

	constructor(baseConf?: any) {
		// console.log('am I being constructed');
		this.conf = baseConf || {};
	}

	get(key: string) {
		return _.get(this.conf, key);
	}

	set(key: string, value: any) {
		return _.set(this.conf, key, value);
	}
}