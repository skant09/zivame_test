'use strict';

import fs from 'fs';
import path from 'path';
import del from 'del';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import server from 'gulp-develop-server';
import runSequence from 'run-sequence';
import sass from 'sass-loader';

const gulpPlugins = gulpLoadPlugins();

let appConfig = {
  src: './src',
  dest: './build'
}

// Clean output directory
gulp.task('clean', () => del(['.tmp', './build'], {
  dot: true
}));


// Copy all files at the root level (app)
gulp.task('copy', () => {
  gulp.src([
      './src/*',
      './src/**/*.jpg',
      './src/**/*.css',
      './src/**/*.hbs',
      '!./src/*.js',
      '!./src/**/*.js',
      '!./src/public/sass/*.scss',
      '!.src/component/**/*.hbs'
    ], {
      dot: false
    })
    .pipe(gulpPlugins.size({
      title: 'copy'
    }))
    .pipe(gulp.dest('./build'))
});


gulp.task('sass', function() {
  gulp.src([
      './src/public/assets/sass/*.scss',
      './src/public/lib/**/*.css'

    ])
    .pipe(gulpPlugins.sass().on('error', gulpPlugins.sass.logError))
    .pipe(gulpPlugins.sourcemaps.init())
    .pipe(gulpPlugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpPlugins.minifyCss({
      compatibility: 'ie8'
    }))
    .pipe(gulpPlugins.sourcemaps.write())
    .pipe(gulpPlugins.size({
      title: 'css'
    }))
    .pipe(gulp.dest('./build/public/assets/css'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enables ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([
      './src/**/*.js',
      '!src/public/assets/js/main.js',
      '!src/public/assets/js/home.js',
      '!src/public/assets/js/require.js',
      '!node_modules/**',
      '!src/public/lib/**'
    ])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(gulpPlugins.eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(gulpPlugins.eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(gulpPlugins.eslint.failOnError());
});

gulp.task('publicScripts', () =>
  gulp.src([
    './src/public/assets/**/*.js',
    './src/public/lib/**/*.js',
  ])
  .pipe(gulpPlugins.newer('.tmp/scripts'))
  .pipe(gulpPlugins.sourcemaps.init())
  .pipe(gulpPlugins.babel({
    compact: 'false'
  }))
  .pipe(gulpPlugins.sourcemaps.write())
  .pipe(gulp.dest('.tmp/scripts'))
  //remove the following lines to disable minification
  //for develoment enviornment
  // .pipe(gulpPlugins.uglify({
  //   preserveComments: 'some'
  // }))
  // Output files
  .pipe(gulpPlugins.size({
    title: 'scripts'
  }))
  .pipe(gulpPlugins.sourcemaps.write())
  .pipe(gulp.dest('./build/public/'))
);

gulp.task('nodeScripts', () =>
  gulp.src([
    './src/*.js'
  ])
  .pipe(gulpPlugins.eslint())
  .pipe(gulpPlugins.eslint.format())
  .pipe(gulpPlugins.eslint.failAfterError())
  .pipe(gulpPlugins.newer('.tmp/scripts'))
  .pipe(gulpPlugins.sourcemaps.init())
  .pipe(gulpPlugins.babel({
    compact: 'false'
  }))
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

gulp.task('scripts', ['lint'], cb => runSequence('nodeScripts', 'publicScripts', cb));

// Build production files, the default task
gulp.task('default', ['clean'], cb => {
  runSequence('scripts', 'sass', 'copy', cb);
});

// Rerun the task when a file changes
gulp.task('watch', ['default'], function() {
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/*.hbs', ['copy']);
  // listen for changes
  gulpPlugins.livereload.listen();
  // gulp.watch('./src/*', ['default']);
  // configure nodemon
  server.listen({
    path: './build/app.js'
  }, gulpPlugins.livereload.listen());
});


gulp.task('serve', ['watch', 'default']);
