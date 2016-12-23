var child  = require('child_process');
var browserSync = require('browser-sync').create();

var gulp   = require('gulp');
var concat = require('gulp-concat');
var gutil  = require('gulp-util');
var cssnano = require('gulp-cssnano');

var siteRoot = '_site';
var cssFiles = ['./css/bootstrap.css','./css/style.css','./css/dark.css','./css/font-icons.css','./css/animate.css','./css/magnific-popup.css','./css/responsive.css','./css/components/bs-rating.css','./css/components/bs-switches.css','./css/components/radio-checkbox.css','./css/components/bs-datatable.css','./css/components/bs-filestyle.css','./css/custom.css'];

gulp.task('css', function() {
  gulp.src(cssFiles)
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets'));
});

gulp.task('nano', function () {
  return gulp.src('./assets/all.css')
    .pipe(cssnano())
    .pipe(gulp.dest('assests'));
});

gulp.task('jekyll', function() {
  var jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  var jekyllLogger = function (buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach( function (message) {
        gutil.log('Jekyll: ' + message);
    });
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', function() {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['css']);
});


gulp.task('default', ['css', 'nano', 'jekyll', 'serve']);
