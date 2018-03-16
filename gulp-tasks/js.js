// Require package information.
const pkg = require('../package.json');
const { src, dest } = pkg.paths;


// Require NPM packages.
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


gulp.task('js', () => {
  // Build javascript and json modules with Browserify.
  return browserify({
    entries: `${src.js}/script.js`,
    extensions: ['.js', '.json'],
    debug: true
  })

    // Use Babel to transpile.
    .transform(babelify)
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())

    // Write sourcemaps.
    .pipe(sourcemaps.write())

    // Write the file.
    .pipe(gulp.dest(dest.js))

    // Inject changes to browsers.
    .pipe(browserSync.stream());
});
