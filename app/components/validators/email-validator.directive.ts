import {Directive, forwardRef} from "@angular/core";
import {FormControl, NG_VALIDATORS, Validator} from "@angular/forms";


@Directive({
	selector: '[n9-email][ngModel],[n9-email][formControl]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true }
	]
})
export class EmailValidatorDirective implements Validator {
	constructor() {
	}

	static validEmail(c: FormControl) {
		const emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

		return emailRegexp.test(c.value) ? null : { n9Email: { valid: false } };
	}

	validate(c: FormControl) {
		return EmailValidatorDirective.validEmail(c);
	}
}