import {Component} from "@angular/core";
import {ConfigurationService} from "../components/conf/configuration-service";

@Component({
	selector: 'header',
	templateUrl: './header.html'
})
export class HeaderComponent {
	constructor(private conf: ConfigurationService) {

	}
}