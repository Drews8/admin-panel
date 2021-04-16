const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//SASS Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(
      sass({
        includePaths: ['node_modules'],
      }).on('error', sass.logError)
    )
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Task
function browsersyncServe(cb) {
  browserSync.init({
    server: '.',
    baseDir: '.',
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch task
function watchTask() {
  watch('*.html', browsersyncReload);
  // watch(
  //   ['app/scss/**/*.scss', 'app/js/**/*.js'],
  //   series(scssTask, browsersyncReload)
  // );
  watch('app/scss/**/*.scss', series(scssTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(scssTask, browsersyncServe, watchTask);
