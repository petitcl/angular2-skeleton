import {NgModule} from "@angular/core";
import {LoginComponent} from "./login-component";
import {Routes, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
	{ path: '', component: LoginComponent }
];

@NgModule({
	imports: [
		FormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [LoginComponent]
})
export class LoginModule {

}