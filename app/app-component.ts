import {Component} from "@angular/core";
import {TranslateService} from 'ng2-translate';

@Component({
	selector: 'my-app',
	template: require<string>('./app.html')
})
export class AppComponent {
	constructor(private translateService: TranslateService) {
		console.log('AppComponent instanciated !');
		this.translateService.setDefaultLang("en-GB");
		this.translateService.use("en-GB");
	}
}
