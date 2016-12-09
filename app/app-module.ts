import {NgModule, ValueProvider} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {AppComponent} from "./app-component";
import {Http, HttpModule} from "@angular/http";
import {StoreModule} from "./components/store/store-module";

const WINDOW_PROVIDER: ValueProvider = {
	provide: Window,
	useValue: window
};

@NgModule({
	providers: [
		WINDOW_PROVIDER
	],
	imports: [
		BrowserModule,
		HttpModule,
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (http: Http) => new TranslateStaticLoader(http, '/translations', '.json'),
			deps: [Http]
		}),
		StoreModule
	],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
}
