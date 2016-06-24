var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('default', function() {
  // place code for your default task here
  gulp.start('copy');
});

gulp.task('copy',function() {
    gulp.src('./node_modules/**/*').pipe(gulp.dest('./www/lib'));
})

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})
