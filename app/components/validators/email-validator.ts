import {Directive, forwardRef} from "@angular/core";
import {FormControl, NG_VALIDATORS} from "@angular/forms";

@Directive({
	selector: '[n9-email][ngModel],[n9-email][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
	]
})
export class EmailValidator {
	private emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

	constructor() {

	}

	validate(c: FormControl) {
		return this.emailRegexp.test(c.value) ? null : { n9Email: { valid: false} };
	}
}