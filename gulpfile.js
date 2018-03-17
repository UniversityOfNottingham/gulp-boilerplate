// Require gulp.
const gulp = require("gulp");

// Require each of the gulp tasks from the gulp-tasks folder.
require("require-dir")("./gulp-tasks");

// Default task: 'gulp', 'npm build' - Build everything for production, do not watch for changes.
gulp.task("default", ["clean", "minify", "uglify", "icons"]);

// Test task: 'gulp test', 'npm test' - Run tasks to code code quality.
gulp.task("test", ["sasslint", "eslint"]);
