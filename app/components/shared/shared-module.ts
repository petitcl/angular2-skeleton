import {NgModule} from "@angular/core";
import {EmailValidator} from "../validators/email-validator";

/*
* Here put all the shared directives, components and pipe
* You should import this module in every module where you want to use these shared directives
* */
@NgModule({
	declarations: [EmailValidator],
	exports: [EmailValidator]
})
export class SharedModule {

}