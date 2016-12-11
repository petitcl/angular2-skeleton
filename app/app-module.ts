import {NgModule, ValueProvider} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule, TranslateLoader, TranslateStaticLoader, TranslatePipe} from "ng2-translate";
import {AppComponent} from "./app-component";
import {Http, HttpModule} from "@angular/http";
import {StoreModule} from "./components/store/store-module";
import {ConfigurationModule} from "./components/conf/configuration-module";
import {HeaderModule} from "./header/header-module";
import {SkeletonModule} from "./components/skeleton/skeleton-module";

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
		StoreModule,
		SkeletonModule,
		ConfigurationModule.forRoot(process.env),
		HeaderModule
	],
	// declarations: [AppComponent, TranslatePipe],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
}
