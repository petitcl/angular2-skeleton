/// <reference path="../node_modules/@types/webpack-env/index.d.ts" />
import {Component} from "@angular/core";

@Component({
	selector: 'my-app',
	template: require<string>('./app.html')
})
export class AppComponent {
	constructor() {
		console.log('AppComponent instanciated !');
	}
}
