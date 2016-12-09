import {Component, Inject} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {StoreService} from "./components/store/store-service";
import {StoreServiceToken} from "./components/store/store-provider";

@Component({
	selector: 'my-app',
	template: require<string>('./app.html')
})
export class AppComponent {
	constructor(
		private translateService: TranslateService,
		@Inject(StoreServiceToken) private store: StoreService
	) {
		console.log('AppComponent instanciated !');
		this.translateService.setDefaultLang("en-GB");
		this.translateService.use("en-GB");

		store.set("tata", "tutu");
		console.log(store.get("tata"));
	}
}
