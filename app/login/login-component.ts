import {Component} from "@angular/core";
import {ConfigurationService} from "../components/conf/configuration-service";
import {TranslateService} from "ng2-translate";

@Component({
	selector: 'login',
	templateUrl: './login.html',
	//careful: we do not have sourcemaps when using styleUrls (yet)
	styleUrls: ['./login-module.scss']
})
export class LoginComponent {

	credentials = {};

	constructor(private conf: ConfigurationService, private translateService: TranslateService) {
		// console.log(conf.get('nested'));
		// console.log(translateService.currentLang);
		// console.log(translateService.get('home.title'));
		// console.log(translateService.get('login.title'));
	}

	onSubmit() {
		// console.log('submit!');
	}
}