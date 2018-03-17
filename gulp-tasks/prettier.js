// Require package information.
const pkg = require('../package.json');
const { src } = pkg.paths;

// Require NPM packages.
const gulp = require('gulp');
const prettier = require('gulp-prettier-plugin');

// Ensure CSS and JS gets the prettier treatment.
gulp.task('prettier', () => {
  return gulp
    .src([
      `${src.sass}/**/*.scss`,
      `${src.js}/**/*.js`,
      './gulpfile.js',
      './gulp-tasks/**/*.js'
    ])
    .pipe(prettier({ singleQuote: true }, { filter: true }))
    .pipe(gulp.dest(file => file.base));
});
