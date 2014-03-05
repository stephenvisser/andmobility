var gulp = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    livereload = require('connect-livereload'),
    lr = require('gulp-livereload'),
    less = require('gulp-less'),
    connect = require('connect'),
    http = require('http');

var app = connect()
  .use(livereload())
  .use(connect.static('public'));

gulp.task('serve', function(){
  console.log('running server');
  http.createServer(app).listen(3000);
});

var lessFiles = 'public/*.less';
gulp.task('css', function(){
  return gulp.src(lessFiles).pipe(less()).pipe(autoprefix()).pipe(gulp.dest('public'));
});

var htmlFiles = 'public/*.html';
gulp.task('html', function(){
  return gulp.src(htmlFiles);
});

var jsFiles = 'public/*.js';
gulp.task('js', function(){
  return gulp.src(jsFiles);
});

gulp.task('default', ['css', 'serve'], function(){
  var lrServer = lr();
  gulp.watch(lessFiles, ['css']).on('change', function(file) {
      lrServer.changed(file.path);
  });
  gulp.watch(htmlFiles, ['html']).on('change', function(file) {
      lrServer.changed(file.path);
  });
  gulp.watch(jsFiles, ['js']).on('change', function(file) {
      lrServer.changed(file.path);
  });
});
