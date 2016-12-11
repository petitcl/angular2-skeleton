import {NgModule} from "@angular/core";
import {LoginComponent} from "./login-component";
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
	{ path: '', component: LoginComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [LoginComponent]
})
export class LoginModule {

}