// Require package.json so we can use its content.
// This is particularly handy for WordPress themes.
const pkg = require('./package.json');


// Require each package we got from NPM.
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');


// Set the paths to source and destination files in an object.
// We could move this to its own json file if we wanted.
const path = {
  src: {
    sass: './src/sass'
  },
  dest: {
    css: './'
  }
};


// Define a comment that we can use on our built CSS.
const minifiedHeader = `/* ${pkg.name} ${pkg.version} | ${new Date()} */\n`;


// CSS: Build from SASS, add prefixes and sourcemaps.
// Calls the 'sasslint' task before running.
gulp.task('css', ['sasslint'], () => {
  return gulp.src(`${path.src.sass}/**/*.scss`)
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
    .pipe(header(cssHeader))
    .pipe(gulp.dest(path.dest.css));
});


// Lint our SASS files. See '.sass-lint.yml' for rules.
gulp.task('sasslint', () => {
  return gulp.src(`${path.src.sass}/**/*.scss`)
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
  return gulp.src(`${path.dest.css}/style.css`)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(header(minifiedHeader))
    .pipe(gulp.dest(path.dest.css));
});


// Do it all (except watch).
gulp.task('default', ['minify']);
