import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../components/validators/email-validator";

@Component({
	selector: 'login',
	templateUrl: './login.html',
	//careful: we do not have sourcemaps when using styleUrls (yet)
	styleUrls: ['./login-module.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			'email': [
				'', [
					Validators.required,
					EmailValidator.validEmail
				]
			],
			'password': [
				'', [Validators.required]
			]
		});
	}

	onSubmit() {
		// console.log(this.loginForm.valid);
		// console.log('submit!');
	}
}