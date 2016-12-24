import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";

import {AppModule} from "./app.module";

// console.log(process, process.env.NODE_ENV, process.env.api);
if (process.env.NODE_ENV !== 'development') {
	enableProdMode();
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

// console.log('bootstrapModule');