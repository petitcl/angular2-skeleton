import {NgModule, ModuleWithProviders} from "@angular/core";
import {EmailValidator} from "../validators/email-validator";
import {TranslateModule} from "ng2-translate";

/*
* Here put all the shared directives, components and pipe
* You should import this module in every module where you want to use these shared directives
* */
@NgModule({
	imports: [
		TranslateModule
	],
	declarations: [
		EmailValidator
	],
	exports: [
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