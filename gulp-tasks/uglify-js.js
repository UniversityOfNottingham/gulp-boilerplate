// Require package information.
const pkg = require("../package.json");
const { dest } = pkg.paths;

// Require NPM packages.
const gulp = require("gulp");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

// Uglify production JS.
gulp.task("uglify", ["js"], () => {
  return gulp
    .src([`${dest.js}/*.js`, `!${dest.js}/*.min.js`])
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(dest.js));
});
