import {Injectable} from "@angular/core";
import {StoreService} from "./store.service";

@Injectable()
export class LocalStorageStoreService implements StoreService {
	constructor(private window: Window) {
		// console.log('dqsdsq');
	}

	get(key: string): any {
		try {
			return JSON.parse(this.window.localStorage.getItem(key));
		} catch (e) {
			return null;
		}
	}

	set(key: string, data?: any) {
		if (data === undefined) {
			this.del(key);
			return;
		}
		try {
			this.window.localStorage.setItem(key, JSON.stringify(data));
		} catch (e) {

		}
	}

	del(key: string) {
		try {
			this.window.localStorage.removeItem(key);
		} catch (e) {

		}
	}

	clear() {
		try {
			this.window.localStorage.clear();
		} catch (e) {

		}
	}
}