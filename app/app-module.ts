import {NgModule, ValueProvider} from "@angular/core";
import {AppComponent} from "./app-component";
import {HeaderModule} from "./header/header-module";
import {SkeletonModule} from "./components/skeleton/skeleton-module";
import {HomeComponent} from "./home/home-component";
import {Routes, RouterModule} from "@angular/router";

const WINDOW_PROVIDER: ValueProvider = {
	provide: Window,
	useValue: window
};

const routes: Routes = [
	{ path: '', component: HomeComponent }
];


@NgModule({
	providers: [
		WINDOW_PROVIDER
	],
	imports: [
		RouterModule.forRoot(routes),
		SkeletonModule,
		HeaderModule
	],
	declarations: [AppComponent, HomeComponent],
	bootstrap: [AppComponent]
})
export class AppModule {

}
