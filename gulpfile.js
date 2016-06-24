var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
  gulp.start('copy');
});

gulp.task('copy',function() {
    gulp.src('./node_modules/**/*').pipe(gulp.dest('./www/lib'));
})
