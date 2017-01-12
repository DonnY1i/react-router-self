var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
var browserSync = require('browser-sync').create();


/**
 * Build (Webpack)
 */

gulp.task('clean:build', function() {
  del('./public/js/*')
})

gulp.task('build', ['clean:build'], function() {
  return gulp.src('./app/app.js')
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch:build', ['browserSync'], function() {
  return gulp.watch('./app/**/*', ['build']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
});

/**
 * Main tasks
 */

gulp.task('serve', ['browserSync']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['watch']);