import {NgModule, ValueProvider} from "@angular/core";
import {AppComponent} from "./app-component";
import {SkeletonModule} from "./components/skeleton/skeleton-module";
import {HomeComponent} from "./home/home-component";
import {Routes, RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header-component";

const WINDOW_PROVIDER: ValueProvider = {
	provide: Window,
	useValue: window
};

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', loadChildren: './login/login-module#LoginModule' }
];


@NgModule({
	providers: [
		WINDOW_PROVIDER
	],
	imports: [
		RouterModule.forRoot(routes),
		SkeletonModule
	],
	declarations: [AppComponent, HeaderComponent, HomeComponent],
	bootstrap: [AppComponent]
})
export class AppModule {

}
