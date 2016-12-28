var child  = require('child_process');
var browserSync = require('browser-sync').create();

var gulp = require('gulp');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

var siteRoot = '_site';
var cssFiles = ['./css/style.css','./css/dark.css','./css/font-icons.css','./css/animate.css','./css/magnific-popup.css','./css/fonts.css','./css/responsive.css','./css/components/bs-rating.css','./css/components/bs-switches.css','./css/components/radio-checkbox.css','./css/components/bs-datatable.css','./css/components/bs-filestyle.css','./css/custom.css'];
var jsFiles  = ['./js/plugins.js','./js/functions.js','./js/validator.min.js','./js/ajax-store.js','./js/jquery.zoom.min.js','./js/components/bs-datatable.js'];


gulp.task('css', function() {
  gulp.src(cssFiles)
    .pipe(concat('all.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('nano', function () {
  return gulp.src('./css/all.css')
    .pipe(cssnano())
    .pipe(gulp.dest('assets'));
});

gulp.task('scripts', function() {
  gulp.src(jsFiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compress', function () {
  return gulp.src('./js/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets'));
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
  gulp.watch(jsFiles, ['scripts']);
  gulp.watch('./css/all.css', ['nano']);
  gulp.watch('./js/all.js', ['compress']);
});


gulp.task('default', ['css', 'scripts', 'nano', 'compress', 'jekyll', 'serve']);
