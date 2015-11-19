'use strict';

import fs from 'fs';
import path from 'path';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import server from 'gulp-develop-server';
import runSequence from 'run-sequence';

const gulpPlugins = gulpLoadPlugins();


let appConfig = {
	src: './src',
	dest: './build'
}

// Clean output directory
gulp.task('clean', cb => del(['.tmp', './build'], {
	dot: true
}));


// Copy all files at the root level (app)
gulp.task('copy', () =>
	gulp.src([
		'./src/*',
		'./src/**/*',
		'!./src/*.js',
		'!./src/**/*.js',
		'!./src/assets/sass',
		'!./src/**/*.scss'
	], {
		dot: true
	}).pipe(gulp.dest('./build'))
	.pipe(gulpPlugins.size({
		title: 'copy'
	}))
);


gulp.task('sass', function() {
	gulp.src('./src/assets/sass/*.scss')
		.pipe(gulpPlugins.sass().on('error', gulpPlugins.sass.logError))
		.pipe(gulpPlugins.sourcemaps.init())
		.pipe(gulpPlugins.autoprefixer({
            	browsers: ['last 2 versions'],
            	cascade: false
    		}))
		.pipe(gulpPlugins.minifyCss({compatibility: 'ie8'}))
		.pipe(gulpPlugins.sourcemaps.write())
		.pipe(gulp.dest('./build/assets/css'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enables ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', () =>
	gulp.src([
		'./src/*.js'
	])
	.pipe(gulpPlugins.newer('.tmp/scripts'))
	.pipe(gulpPlugins.sourcemaps.init())
	.pipe(gulpPlugins.babel())
	.pipe(gulpPlugins.sourcemaps.write())
	.pipe(gulp.dest('.tmp/scripts'))
	//remove the following lines to disable minification
	//for develoment enviornment
	.pipe(gulpPlugins.uglify({
		preserveComments: 'some'
	}))
	// Output files
	.pipe(gulpPlugins.size({
		title: 'scripts'
	}))
	.pipe(gulpPlugins.sourcemaps.write('.'))
	.pipe(gulp.dest('./build'))
);

// Build production files, the default task
gulp.task('default', ['clean'], cb => {
	runSequence('scripts', 'sass', 'copy', cb);
});

// Rerun the task when a file changes
gulp.task('watch', ['default'], function() {
	gulp.watch('src/**/*', ['default']);
	// listen for changes
	gulpPlugins.livereload.listen();
	gulp.watch('./src/*',['default']);
	// configure nodemon
	server.listen({
		path: './build/app.js'
	}, gulpPlugins.livereload.listen());
});


gulp.task('serve', ['watch', 'default']);
