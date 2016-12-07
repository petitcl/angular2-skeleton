import {Component} from "@angular/core";

@Component({
	selector: 'my-app',
	template: require('./app.html')
})
export class AppComponent {
	constructor() {
		console.log('win');
	}
}
