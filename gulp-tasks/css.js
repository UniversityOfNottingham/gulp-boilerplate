// Require package information.
const pkg = require('../package.json');
const { src, dest } = pkg.paths;

// Require NPM packages.
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notifier = require('node-notifier');
const browserSync = require('browser-sync').create();

// Build CSS, add vendor prefixes and sourcemaps.
gulp.task('css', ['sasslint'], () => {
  return gulp
    .src(`${src.sass}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', function(err) {
      sass.logError.call(this, err);
      notifier.notify({
        title: 'Gulp',
        message: 'SASS error'
      });
    })
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.stream());
});
