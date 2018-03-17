// Require package information.
const pkg = require("../package.json");
const { src, dest } = pkg.paths;

// Require NPM packages.
const gulp = require("gulp");
const babelify = require("babelify");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const merge = require("merge-stream");
const browserSync = require("browser-sync").create();

// Build javascript and json modules with Browserify.
gulp.task("js", ["eslint"], () => {
  const files = ["script", "polyfill"];
  return merge(
    files.map(file => {
      return browserify({
        entries: `${src.js}/${file}.js`,
        debug: true
      })
        .transform(babelify)
        .bundle()
        .pipe(source(`${file}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.js));
    })
  ).pipe(browserSync.stream());
});
