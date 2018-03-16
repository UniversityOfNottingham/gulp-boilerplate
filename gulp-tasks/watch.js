// Require package information.
const pkg = require('../package.json');
const { src, dest } = pkg.paths;


// Require NPM packages.
const gulp = require('gulp');
const browserSync = require('browser-sync').create();


// Start browsersync and run tasks on changes.
gulp.task('watch', ['css', 'js'], () => {
  browserSync.init({
    server: {
      // proxy: 'https://mods.docker',
      // files: ['./**/*.php', './**/*.twig'],
      // serveStaticOptions: {
      //   extensions: ['html']
      // }
      baseDir: dest.dest,
      notify: false
    }
  });
  gulp.watch(`${src.sass}/**/*.scss`, ['css']);
  gulp.watch(`${src.js}/**/*.js`, ['js']);
});
