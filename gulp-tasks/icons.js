// Require package information.
const pkg = require('../package.json');
const { src, dest } = pkg.paths;


// Require NPM packages.
const gulp = require('gulp');
const svgo = require('gulp-svgo');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');


// Build individual icons into an icon sprite.
// Remove style elements and fill colours.
gulp.task('icons', () => {
  return gulp.src(`${src.icons}/**/*.svg`)
    .pipe(svgo({plugins: [
      {removeStyleElement: true},
      {removeAttrs: {attrs: 'fill'}}
    ]}))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(gulp.dest(dest.icons));
});
