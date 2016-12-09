import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

import {AppComponent} from "./app-component";
import {Http, HttpModule} from "@angular/http";

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (http: Http) => new TranslateStaticLoader(http, '/translations', '.json'),
			deps: [Http]
		})
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
}
