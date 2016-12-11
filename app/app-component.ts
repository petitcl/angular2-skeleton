import {Component, Inject} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {StoreService} from "./components/store/store-service";
import {StoreServiceToken} from "./components/store/store-provider";
import {ConfigurationService} from "./components/conf/configuration-service";

@Component({
	selector: 'my-app',
	templateUrl: './app.html'
})
export class AppComponent {
	constructor(
		private translateService: TranslateService,
		@Inject(StoreServiceToken) private store: StoreService,
		private conf: ConfigurationService
	) {
		// console.log('AppComponent instanciated !');
		this.translateService.setDefaultLang("en-GB");
		this.translateService.use("en-GB");

		store.set("tata", "tutu");
		conf.set("nested", { property: "success"});
		// console.log(conf.get("nested.property"));
		// console.log(conf.get("NODE_ENV"));
		// console.log(store.get("tata"));
	}
}
