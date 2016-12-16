#Introduction
A simple Angular 2 starter kit, made with webpack, Sass and bootstrap. It also includes a small Angular 2 services preset (like customizable http client, conf service, lcoal store service, etc..) ready to use to build your application.

#Installation
* clone / fork the repo
* `npm i`

#Commands
* `npm start` builds the application
* `npm run watch` builds the application, and starts watch mode
* `npm run tslint` runs tslint
* `npm test` run ALL unit tests once, in PhantomJS
* `npm tdd` run ALL unit tests once, and starts watch mode

#Things to know
* Please do not include lodash directly (ie: `import _ from 'lodash';`), as it will include all the lodash library which is huge (500+ Mb). Instead, import only the operators you need (ex: `import _map = require("lodash/map");` ).
* Place your conf properties in the conf folder. There is one file per environment (ie: `conf/development.js`, `conf/production.js`, etc). All the variables in the `env` property will be injected in the Angular application at runtime, and will be available via `ConfigurationService`, or via the global `process.env` variable.
* If you want to make a directive/pipe/component available in the whole project, please add it to `app/components/shared/shared-module.ts`, and make sure you import this module in all sub modules.
* If you want to make a service/provider available in the whole project, please add it to the `app/components/core/core-module`. Make sure that this module is **only** imported in the root module; otherwise your services would be instancied multiple times which could cause weird issues.

#Features TODO list
* :white_check_mark: uglify css if not dev
* :white_check_mark: uglify js if not dev
* :white_check_mark: imagemin if not dev
* :white_check_mark: uglify html if not dev
* :white_circle: ~~custom lodash build~~ (use lodash operator import; `import _map = require("lodash/map");`)
* :white_check_mark: inject environment specific conf
* :white_check_mark: tslint
* :white_check_mark: images
* :white_check_mark: fonts
* :white_check_mark: misc files
* :white_check_mark: js/ts sourcemaps in dev only
* :white_check_mark: scss sourcemaps in dev only
* :white_check_mark: inline HTML partials
* :red_circle: css livereload
* :red_circle: js livereload
* :red_circle: js hot reload
* :white_check_mark: watch
* :white_check_mark: add bootstrap
* :white_check_mark: add typings
* :white_check_mark: add mixgen
* :white_check_mark: add font awesome
* :red_circle: base webpack config file
* :white_check_mark: unit tests
* :red_circle: end to end tests
* :red_circle: code coverage
* :white_circle: ~~release task~~ (use `npm version` instead)
* :red_circle: AOT compilation
* :red_circle: Make it angular-cli friendly
* :red_circle: reduce build size
* :white_check_mark: git commit hook
* :white_check_mark: add angular i18n
* :white_check_mark: Add Rx.js conf
* :white_check_mark: add dashboard page
* :white_check_mark: add components directory
* :white_check_mark: Store service
* :white_check_mark: Session service
* :white_check_mark: Configuration service
* :red_circle: (bonus) Conf / Value annotation
* :white_check_mark: (bonus) SkeletonModule / CommonsModule
* :white_check_mark: Authorization HTTP interceptor 
* :red_circle: Cachify Service
* :white_check_mark: Header Module
* :red_circle: Footer Module
* :white_check_mark: Fake Login Module
* :red_circle: More Documentation
* :red_circle: More Unit tests (as an example)
