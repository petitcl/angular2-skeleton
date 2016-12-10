import {Injectable} from "@angular/core";
const _ = require("lodash");

@Injectable()
export class ConfigurationService {
	private conf: any;

	constructor() {
		this.conf = {};
	}

	get(key: string) {
		return _.get(this.conf, key);
	}

	set(key: string, value: any) {
		return _.set(this.conf, key, value);
	}
}