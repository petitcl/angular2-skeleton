import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header-component";
import {SkeletonModule} from "../components/skeleton/skeleton-module";

@NgModule({
	imports: [SkeletonModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})
export class HeaderModule {

}