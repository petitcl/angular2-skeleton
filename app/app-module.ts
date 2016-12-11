import {NgModule, ValueProvider} from "@angular/core";
import {AppComponent} from "./app-component";
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
		SkeletonModule,
		HeaderModule
	],
	// declarations: [AppComponent, TranslatePipe],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule {

}
