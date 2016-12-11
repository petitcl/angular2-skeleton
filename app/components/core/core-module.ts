import {NgModule} from "@angular/core";
import {ConfigurationModule} from "../conf/configuration-module";
import {StoreModule} from "../store/store-module";


/**
 * This is the "core" module. It aggregates all custom made services.
 * This module should only be imported in the root module.
 * */
@NgModule({
	imports: [
		StoreModule,
		ConfigurationModule.forRoot(process.env)
	]
})
export class CoreModule {

}