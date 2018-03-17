// Require package information.
const pkg = require("../package.json");
const { src } = pkg.paths;

// Require NPM packages.
const gulp = require("gulp");
const sassLint = require("gulp-sass-lint");
const notifier = require("node-notifier");

// Check the content of each .scss file against the rules defined in .sass-lint.yml.
gulp.task("sasslint", ["prettier"], () => {
  return gulp
    .src(`${src.sass}/**/*.scss`)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on("error", () => {
      notifier.notify({
        title: "Gulp",
        message: "SASS linting failed"
      });
    });
});
