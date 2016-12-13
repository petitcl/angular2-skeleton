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

	getAsString(key: string) {
		return <string>this.get(key);
	}

	set(key: string, value: any) {
		return _.set(this.conf, key, value);
	}
}