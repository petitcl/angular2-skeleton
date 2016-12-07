import {Component} from "@angular/core";

@Component({
	selector: 'my-app',
	template: 
		`
			<div class="container">
				<h1>My First <span>application</span></h1>
			</div>
		`
})
export class AppComponent {
	constructor() {
		console.log('win');
	}
}
