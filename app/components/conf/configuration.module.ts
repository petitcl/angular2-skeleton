import {NgModule, ModuleWithProviders} from "@angular/core";
import {ConfigurationService} from "./configuration.service";

@NgModule({
	providers: [
		{
			provide: ConfigurationService,
			useFactory: () => new ConfigurationService(),
			deps: []
		}
	]
})
export class ConfigurationModule {
	static forRoot(baseConf: any): ModuleWithProviders {
		return {
			ngModule: ConfigurationModule,
			providers: [
				{
					provide: ConfigurationService,
					useFactory: () => new ConfigurationService(baseConf),
					deps: []
				}
			]
		};
	}
}