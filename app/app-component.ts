import {Component, Inject} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {StoreService} from "./components/store/store-service";
import {ConfigurationService} from "./components/conf/configuration-service";

@Component({
	selector: 'my-app',
	templateUrl: './app.html'
})
export class AppComponent {
	constructor(
		private translateService: TranslateService,
		private store: StoreService,
		private conf: ConfigurationService
	) {
		// console.log('AppComponent instanciated !');
		this.translateService.setDefaultLang("en-GB");
		this.translateService.use("fr-FR");

		store.set("tata", "tutu");
		conf.set("nested", { property: "success"});
		// console.log(conf.get("nested.property"));
		// console.log(conf.get("NODE_ENV"));
		// console.log(store.get("tata"));
	}
}
