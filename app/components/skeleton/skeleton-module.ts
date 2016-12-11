import {NgModule} from "@angular/core";
import {Http, HttpModule} from "@angular/http";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {ConfigurationModule} from "../conf/configuration-module";
import {StoreModule} from "../store/store-module";
import {BrowserModule} from "@angular/platform-browser";

//TODO: *DO NOT* import StoreModule & ConfigurationModule here, coz it might break future lazy loaded modules
//see https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#q-why-bad


@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		StoreModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (http: Http) => new TranslateStaticLoader(http, '/translations', '.json'),
			deps: [Http]
		}),
		ConfigurationModule.forRoot(process.env)
	],
	exports: [
		TranslateModule
	]
})
export class SkeletonModule {

}