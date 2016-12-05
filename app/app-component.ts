import {Component} from "@angular/core";

@Component({
	selector: 'my-app',
	template: '<h1>My First application</h1>'
})
export class AppComponent {
	constructor() {
		console.log('win');
	}
}
