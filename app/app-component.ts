import {Component} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {SessionService} from "./components/session/session-service";

@Component({
	selector: 'my-app',
	templateUrl: './app.html'
})
export class AppComponent {
	constructor(
		private translateService: TranslateService,
		private session: SessionService
	) {
		this.translateService.setDefaultLang("en-GB");
		this.translateService.use("fr-FR");
		this.session.load();
		// this.session.login({ email: 'titi', password: 'tata'})
		// // this.session.login({ email: 'clement.petit@neo9.fr', password: 'azerty'})
		// 	.subscribe(
		// 		res => {
		// 			console.log("success");
		// 			this.session.logout();
		// 		}
		// 	);
        //
		// this.session.session$.subscribe(
		// 	p => console.log('using session observable', p)
		// );
		// this.session.login$.subscribe(p => console.log("logged in"));
		// this.session.logout$.subscribe(p => console.log("logged out"));
	}
}
