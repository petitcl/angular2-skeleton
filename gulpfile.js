const gulp = require('gulp');
const typescript = require('gulp-typescript');
const concat = require('gulp-concat');
const eventStream = require('event-stream');
const SystemBuilder = require('systemjs-builder');
const sass = require('gulp-sass');
const ng2Templates = require('gulp-inline-ng2-template');

const app = 'app';
const dist = 'dist';
const node_modules = 'node_modules';
const typings = 'typings';

const paths = {
	scripts: {
		src: [
			app + '/**/*.ts',
			typings + '/browser.d.ts'
		],
		concat: 'app.js',
		dest: dist + '/js'
	},
	polyfills: {
		src: [
			node_modules + '/core-js/client/shim.min.js',
			node_modules + '/zone.js/dist/zone.js',
			node_modules + '/reflect-metadata/Reflect.js',
			node_modules + '/systemjs/dist/system.src.js'
		],
		concat: 'polyfills.js',
		dest: dist + '/js'
	},
	libs: {
		src: [
				node_modules + '/@angular/core/bundles/core.umd.js',
				node_modules + '/@angular/common/bundles/common.umd.js',
				node_modules + '/@angular/compiler/bundles/compiler.umd.js',
				node_modules + '/@angular/platform-browser/bundles/platform-browser.umd.js',
				node_modules + '/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
				node_modules + '/@angular/http/bundles/http.umd.js',
				node_modules + '/@angular/router/bundles/router.umd.js',
				node_modules + '/@angular/forms/bundles/forms.umd.js',
				node_modules + '/@angular/upgrade/bundles/upgrade.umd.js',
				node_modules + '/rxjs',
				node_modules + '/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'

],
		concat: 'vendor.js',
		dest: dist + '/js'
	},
	templates: {
		src: app + '/**/*.html'
	},
	images: {
		src: app + '/**/*.{png,jpg,svg,gif}',
		dest: dist + '/img'
	},
	sass: {
		src: [
			app + '/main.scss'
		],
		srcWatch:  [
			app + '/main.scss',
			app + '/**/*.scss'
		],
		concat: 'styles.css',
		dest: dist + '/css'
	},
	misc: [
		{
			src: app + '/**/*.ttf',
			dest: dist + '/fonts'
		},
		{
			src: app + '/index.html',
			dest: dist
		},
		{
			src: node_modules + '/systemjs/dist/system.src.js',
			dest: dist + '/js'
		},
		{
			src: node_modules + '/font-awesome/fonts/fontawesome-webfont.*',
			dest:  dist + '/fonts/'
		},
		{
			src: 'system.config.js',
			dest: dist
		}
	]
};

gulp.task('typescript', function () {
	// const tsProject = typescript.createProject('tsconfig.json', {
	// 	typescript: require('typescript'),
	// 	sortOuput: true
	// });
	const tsProject = typescript.createProject('tsconfig.json');

	return gulp.src(paths.scripts.src)
	  .pipe(tsProject(typescript.reporter.fullReporter())).js
	  .pipe(ng2Templates({ base: app }))
	  .pipe(gulp.dest(paths.scripts.dest))
});

gulp.task('scripts', ['typescript'], function () {
	var builder = new SystemBuilder(dist + '/js', {
		paths: {
			'*': '*.js'

		},
		meta: {
			'@angular/*': { build: false },
			'rxjs/*': { build: false }
		}
	});

	return builder.bundle('main', dist + '/js/app.bundle.js');
});

gulp.task('libs', function () {
	return gulp.src(paths.libs.src)
	  .pipe(concat(paths.libs.concat))
	  .pipe(gulp.dest(paths.libs.dest))
});

gulp.task('polyfills', function () {
	return gulp.src(paths.polyfills.src)
	  .pipe(concat(paths.polyfills.concat))
	  .pipe(gulp.dest(paths.polyfills.dest))
});

gulp.task('styles', function () {
	return gulp.src(paths.sass.src)
	  .pipe(sass({
		  includePaths: [app + '/'],
		  errLogToConsole: true
	  }).on('error', sass.logError))
	  .pipe(concat(paths.sass.concat))
	  .pipe(gulp.dest(paths.sass.dest));
});

gulp.task('images', [], function () {
	return gulp.src(paths.images.src)
	  .pipe(gulp.dest(paths.images.dest));
});

gulp.task('misc', [], function () {
	return eventStream.merge.apply(null, paths.misc.map(function (item) {
		return gulp.src(item.src)
		// .pipe(gulpif(item.replace !== false, frep(envs[env])))
		  .pipe(gulp.dest(item.dest));
	}));
});

gulp.task('watch', [], function () {
	[
		gulp.watch([ paths.scripts.src, paths.templates.src ], [ 'scripts' ]),
		gulp.watch([ paths.sass.srcWatch ], [ 'styles' ]),
		// gulp.watch(paths.images, [ 'images' ]),
		// gulp.watch(paths.fonts, [ 'fonts' ]),
		gulp.watch(paths.misc.map((item) => item.src), [ 'misc' ])
	].forEach(function (watch) {
		watch.on('change', function (event) {
			console.log('File %s was %s, running tasks...', event.path, event.type);
		});
	});
});

gulp.task('default', ['images', 'polyfills', 'libs', 'scripts', 'styles', 'misc']);
