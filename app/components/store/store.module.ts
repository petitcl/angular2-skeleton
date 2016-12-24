import {NgModule, ValueProvider} from "@angular/core";
import {StoreProvider} from "./store.provider";

const WINDOW_PROVIDER: ValueProvider = {
	provide: Window,
	useValue: window
};

@NgModule({
	providers: [
		WINDOW_PROVIDER,
		StoreProvider
	]
})
export class StoreModule {
}
