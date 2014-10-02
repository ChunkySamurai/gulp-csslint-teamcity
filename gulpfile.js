/* Initialization
 * Set configuration and import modules.
 */
// Load Gulp Core Modules
var gulp = require('gulp');
var gutil = require('gulp-util');

// Load CI Modules
var bump = require('gulp-bump');
var git = require('gulp-git');

// Load JSHint Modules
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
  return gulp.src('./src/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build', ['test'], function () {
  return gulp.src('./src/index.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump'], function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});

gulp.task('npm', ['tag'], function (done) {
  require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('test', ['lint']);
gulp.task('ci', ['build']);
gulp.task('release', ['npm']);
