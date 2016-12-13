import {NgModule, ModuleWithProviders} from "@angular/core";
import {EmailValidator} from "../validators/email-validator";
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
		EmailValidator
	],
	exports: [
		ReactiveFormsModule,
		TranslateModule,
		EmailValidator
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}