// Require package information.
const pkg = require('../package.json');
const { dest } = pkg.paths;

// Require NPM packages.
const gulp = require('gulp');
const del = require('del');

// Delete all generated content.
gulp.task('clean', () => {
  return del.sync([dest.css, dest.js, dest.icons]);
});
