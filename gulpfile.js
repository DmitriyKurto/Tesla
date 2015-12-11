var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    minHTML = require('gulp-minify-html'),
    minCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    connect = require('gulp-connect'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin');

var config = {
    htmlMain: [
        'app/index.html'
    ],
    html: [
        'app/pages/**/*.html'
    ],
    css:[
        'app/css/**/*.css'
    ],
    img: [
        'app/img/**/*.{png,jpg,jpeg,gif,svg}'
    ],
    scripts:[
        'app/js/**/*.js'
    ]
};

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
    gulp.watch(config.htmlMain, ['usemin']);
    gulp.watch(config.html, ['html']);
    gulp.watch(config.css, ['usemin']);
    gulp.watch(config.scripts, ['usemin']);
    gulp.watch(config.img, ['img']);
});
gulp.task('del', function () {
    return del('dist/');
});
gulp.task('html-index', function(){
    gulp.src(config.htmlMain)
        //.pipe(minHTML())
        .pipe(gulp.dest('dist/'));
});
gulp.task('html', function(){
   gulp.src(config.html)
        .pipe(minHTML())
        .pipe(gulp.dest('dist/pages/'))
        .pipe(connect.reload());
});
gulp.task('img', function(){
    gulp.src(config.img)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(connect.reload());
});
gulp.task('usemin', ['html-index'], function() {
    return gulp.src(config.htmlMain)
        .pipe(usemin({
            css: [minCSS(), 'concat'],
            js: ['concat'],
            js1: [uglify({mangle: false}), 'concat']
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});