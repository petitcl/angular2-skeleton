import {NgModule} from "@angular/core";
import {ConfigurationModule} from "../conf/configuration-module";
import {StoreModule} from "../store/store-module";
import {SessionService} from "../session/session-service";
import {ApiHttpClient} from "../http/api-http-client";
import {LoggedInGuard} from "../session/logged-in-guard";


/**
 * This is the "core" module. It aggregates all custom made services.
 * This module should only be imported in the root module.
 * */
@NgModule({
	imports: [
		StoreModule,
		ConfigurationModule.forRoot(process.env)
	],
	providers: [
		SessionService,
		ApiHttpClient,
		LoggedInGuard
	]
})
export class CoreModule {

}