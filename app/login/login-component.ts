import {Component} from "@angular/core";
import {ConfigurationService} from "../components/conf/configuration-service";

@Component({
	selector: 'login',
	templateUrl: './login.html'
})
export class LoginComponent {
	constructor(private conf: ConfigurationService) {
		console.log(conf.get('nested'));
	}

	onSubmit() {
		console.log('submit!');
	}
}