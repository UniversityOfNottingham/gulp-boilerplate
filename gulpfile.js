// Require package.json so we can use its content.
// This is particularly handy for WordPress themes.
const pkg = require('./package.json');
const paths = pkg.paths;


// Require each package we got from NPM.
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const header = require('gulp-header');
const rename = require('gulp-rename');
const notifier = require('node-notifier');
const del = require('del');


// Define a comment that we can use on our built files.
const fileHeader = `/* ${pkg.name} ${pkg.version} | ${new Date()} */\n`;


// CSS: Build from SASS, add prefixes and sourcemaps.
// Calls the 'sasslint' task before running.
gulp.task('css', ['sasslint'], () => {
  return gulp.src(`${paths.src.sass}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', function(err) {
      sass.logError.call(this, err);
      notifier.notify({
        title: 'Gulp',
        message: 'SASS error'
      });
    })
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(header(fileHeader))
    .pipe(gulp.dest(paths.dest.css));
});


// Lint our SASS files. See '.sass-lint.yml' for rules.
gulp.task('sasslint', () => {
  return gulp.src(`${paths.src.sass}/**/*.scss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on('error', () => {
      notifier.notify({
        title: 'Gulp',
        message: 'SASS liniting failed'
      });
    });
});


// Minify CSS.
// Calls the 'css' task before running.
gulp.task('minify', ['css'], () => {
  return gulp.src(`${paths.dest.css}/style.css`)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(header(fileHeader))
    .pipe(gulp.dest(paths.dest.css));
});


// JS: Build from partials and add sourcemaps.
gulp.task('js', () => {
  return browserify({
      entries: `${path.src.js}/app.js`,
      extensions: ['.js', '.json'],
      debug: true
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dest.js));
});


// Delete generated content.
gulp.task('clean', () => {
  return del.sync([paths.dest.dest]);
});


// Watch for changes.
gulp.task('watch', ['default'], () => {
  gulp.watch(`${paths.src.sass}/**/*.scss`, ['css']); //
});


// Do it all (except watch).
gulp.task('default', ['minify', 'uglify']);
