'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var browserSync = require("browser-sync");
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');

// Convert JSX and compile ES2015 to JavaScript
gulp.task('build', function () {
  return gulp.src('src/**/*.jsx')
      .pipe(sourcemaps.init())
      .pipe(react({
        es6module: true
      }))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

gulp.task('compile', function(done) {
    runSequence('build', function() {
        done();
    });
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(['src/**/*.jsx'], ['compile']);
});

// Default Task
gulp.task('default', [], function (cb) {
    gulp.start('build', cb);
});

// Live Reload
gulp.task('browser', function (cb) {
    browserSync.init(null, {
        server: {
            baseDir: ['dist']
        },
        notify: false
    });
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css'
    ], browserSync.reload);
});
