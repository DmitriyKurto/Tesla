var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    minHTML = require('gulp-minify-html'),
    minCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    connect = require('gulp-connect'),
    usemin = require('gulp-usemin');

gulp.task('default', ['public', 'webserver', 'watch']);
gulp.task('public', function(callback) {
    runSequence('del',
        ['html', 'img', 'usemin'],
        callback);
});
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});
gulp.task('watch', function(){
    gulp.watch('app/*.html', ['usemin']);
    gulp.watch('app/pages/*.html', ['html']);
    gulp.watch('app/css/*.css', ['usemin']);
    gulp.watch('app/js/**/*.js', ['usemin']);
    gulp.watch('app/img/**/*.*', ['img']);
});
gulp.task('del', function () {
    return del('dist/');
});
gulp.task('html-index', function(){
    gulp.src('app/*.html')
        //.pipe(minHTML())
        .pipe(gulp.dest('dist/'));
});
gulp.task('html', function(){
   gulp.src('app/pages/*.html')
        .pipe(minHTML())
        .pipe(gulp.dest('dist/pages/'))
        .pipe(connect.reload());
});
gulp.task('img', function(){
    gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
});
gulp.task('usemin', ['html-index'], function() {
    return gulp.src('app/index.html')
        .pipe(usemin({
            css: [minCSS(), 'concat'],
            js: ['concat'],
            js1: ['concat']
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});


