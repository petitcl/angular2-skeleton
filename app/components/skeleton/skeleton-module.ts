import {NgModule} from "@angular/core";
import {Http} from "@angular/http";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";

@NgModule({
	imports: [
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (http: Http) => new TranslateStaticLoader(http, '/translations', '.json'),
			deps: [Http]
		})
	],
	exports: [
		TranslateModule
	]
})
export class SkeletonModule {

}