import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../components/validators/email-validator";
import {SessionService, Credentials} from "../components/session/session-service";
import {Router} from "@angular/router";

@Component({
	selector: 'login',
	templateUrl: './login.html',
	//careful: we do not have sourcemaps when using styleUrls (yet)
	styleUrls: ['./login-module.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private session: SessionService
	) {
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

	onSubmit($event) {
		$event.stopPropagation();
		if (!this.loginForm.valid) return;
		this.session.login(<Credentials>this.loginForm.getRawValue())
			.subscribe(
				null, null,
				() => {
					// console.log('login onComplete');
					this.router.navigate(['']);
				}
			);
	}
}