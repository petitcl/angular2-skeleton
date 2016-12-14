import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {SessionService} from "./components/session/session-service";
import {ConfigurationService} from "./components/conf/configuration-service";
import {ApiHttpClient} from "./components/http/api-http-client";

@Component({
	selector: 'my-app',
	templateUrl: './app.html'
})
export class AppComponent {
	constructor(
		private translateService: TranslateService,
		private session: SessionService,
		private conf: ConfigurationService,
		private http: ApiHttpClient
	) {
		//i18n configuration
		this.translateService.setDefaultLang("en-GB");
		this.translateService.use("fr-FR");

		//session configuration
		this.session.load();

		//api client configuration
		this.http.basePath = this.conf.getAsString("api");
		// this.session.session$.subscribe(p => console.log('new session value', p));
		// this.session.login$.subscribe(p => console.log("logged in"));
		// this.session.logout$.subscribe(p => console.log("logged out"));
	}
}
