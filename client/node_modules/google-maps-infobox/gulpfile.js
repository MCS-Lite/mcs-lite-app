var gulp = require('gulp');
var concat = require('gulp-concat-util');
var chmod = require('gulp-chmod');

gulp.task('modularize', function() {
  gulp.src('./infobox-lib.js')
    .pipe(concat.footer('\n\nmodule.exports = InfoBox;'))
    .pipe(concat("infobox-module.js"))
    .pipe(chmod(766))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
  gulp.watch('./infobox-lib.js', ['modularize']);
});

gulp.task('default', ['watch']);
