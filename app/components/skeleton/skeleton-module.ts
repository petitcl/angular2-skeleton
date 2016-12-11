import {NgModule} from "@angular/core";
import {Http, HttpModule} from "@angular/http";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {ConfigurationModule} from "../conf/configuration-module";
import {StoreModule} from "../store/store-module";
import {BrowserModule} from "@angular/platform-browser";

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