import {NgModule, ModuleWithProviders} from "@angular/core";
import {EmailValidatorDirective} from "../validators/email-validator.directive";
import {TranslateModule} from "ng2-translate";
import {ReactiveFormsModule} from "@angular/forms";

/*
* Here put all the shared directives, components and pipe
* You should import this module in every module where you want to use these shared directives
* */
@NgModule({
	imports: [
		ReactiveFormsModule,
		TranslateModule
	],
	declarations: [
		EmailValidatorDirective
	],
	exports: [
		ReactiveFormsModule,
		TranslateModule,
		EmailValidatorDirective
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}