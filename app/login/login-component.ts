import {Component} from "@angular/core";
import {ConfigurationService} from "../components/conf/configuration-service";

@Component({
	selector: 'login',
	templateUrl: './login.html',
	//careful: we do not have sourcemaps when using styleUrls (yet)
	styleUrls: ['./login-module.scss']
})
export class LoginComponent {

	credentials = {};

	constructor(private conf: ConfigurationService) {
		// console.log(conf.get('nested'));
	}

	onSubmit() {
		// console.log('submit!');
	}
}