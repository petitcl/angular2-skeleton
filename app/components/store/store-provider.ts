import {StoreService} from "./store-service";
import {OpaqueToken} from "@angular/core";
import {LocalStorageStoreService} from "./local-storage-store-service";
import {InMemoryStoreService} from "./in-memory-store-service";

const storeFactory = (): StoreService => {
	if (window && window.localStorage) {
		try {
			window.localStorage.setItem("____test", "success");
			window.localStorage.removeItem("____test");
			return new LocalStorageStoreService(window);
		} catch (e) {

		}
	}
	return new InMemoryStoreService();
};

export let StoreServiceToken = new OpaqueToken("StoreService");

export let StoreProvider = {
	provide: StoreServiceToken,
	useFactory: storeFactory,
	deps: []
};