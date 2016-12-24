import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {Routes, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../components/shared/shared.module";

const routes: Routes = [
	{ path: '', component: LoginComponent }
];

@NgModule({
	imports: [
		FormsModule,
		RouterModule.forChild(routes),
		CommonModule,
		SharedModule
	],
	declarations: [LoginComponent]
})
export class LoginModule {

}