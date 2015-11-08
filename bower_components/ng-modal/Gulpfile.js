var bower    = require('./bower.json'),
    sh       = require('shelljs'),
    gulp     = require('gulp'),
    notify   = require('gulp-notify'),
    jshint   = require('gulp-jshint'),
    stylish  = require('jshint-stylish'),
    mocha    = require('gulp-mocha'),
    annotate = require('gulp-ng-annotate'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify'),
    sequence = require('run-sequence'),
    express  = require('express'),
    open     = require('open'),
    app      = express();

var dependencies = [];

var paths = JSON.parse(
  sh.exec('./node_modules/bower/bin/bower list --paths --json', { silent: true })
    .output);

for (var dependency in paths)
  if (bower.dependencies && dependency in bower.dependencies)
    dependencies.push(paths[dependency]);

var paths = {
  src: ['./src/modal.js', './src/*.*.js', './src/*/**/*.js'],
  preamble: ['./build/preamble.js'],
  postamble: ['./build/postamble.js'],
  tests: ['./tests/**/*.js'],
  dependencies: dependencies,
};

// lint scripts
gulp.task('lint', function () {
  return gulp.src(paths.src)
    .pipe(jshint({ lookup: false }))
    .pipe(jshint.reporter(stylish))
    .pipe(notify({message: 'Jshint done'}));
});

// test changes
gulp.task('test', function() {
  return gulp.src(paths.tests)
    .pipe(mocha({ bail: true, reporter: 'nyan' }));
});

// build dist
gulp.task('build', function() {
  // clean dist
  sh.rm('-f', 'index.js', 'index.min.js');

  gulp.src(dependencies.concat(paths.preamble, paths.src, paths.postamble))
  // concatenate
    .pipe(concat('index.js'))
  // annotate dependency injections
    /* TODO: Enable ngAnnotate when it supports @ngNoInject tags
    .pipe(annotate({ add: true, single_quotes: true })) */
    .pipe(gulp.dest('.'))
  // minify
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

// watch all for changes
gulp.task('watch', function () {
  gulp.watch(paths.src, ['lint', 'test', 'build']);
  gulp.watch(paths.tests, ['test']);
});

// serve a demonstration (used by mock)
gulp.task('serve', function() {
  app.use(express.static('./tests'));
  app.use(express.static('.'));
  app.listen(9000);

  open('http://0.0.0.0:9000');
});

// kick it all off
gulp.task('default', ['lint', 'test', 'watch']);

// serve a mock
gulp.task('mock', function(done) {
  sequence('build', ['serve', 'watch'], done);
});

