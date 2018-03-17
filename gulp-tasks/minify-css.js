// Require package information.
const pkg = require("../package.json");
const { dest } = pkg.paths;

// Require NPM packages.
const gulp = require("gulp");
const rename = require("gulp-rename");
const cssnano = require("gulp-cssnano");

// Minify production CSS.
gulp.task("minify", ["css"], () => {
  return gulp
    .src(`${dest.css}/**/*.css`)
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest(dest.css));
});
