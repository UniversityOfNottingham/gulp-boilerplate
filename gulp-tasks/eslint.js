// Require package information.
const pkg = require('../package.json');
const { src } = pkg.paths;

// Require NPM packages.
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const notifier = require('node-notifier');

// Lint all source and utility JavaScript.
gulp.task('eslint', ['prettier'], () => {
  return gulp
    .src([`${src.js}/**/*.js`, './gulpfile.js', './gulp-tasks/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', () => {
      notifier.notify({
        title: 'Gulp',
        message: 'JS linting failed'
      });
    });
});
