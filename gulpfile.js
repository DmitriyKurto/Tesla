var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    minHTML = require('gulp-minify-html'),
    minCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    del = require('del'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('gulp-main-bower-files');

gulp.task('default', ['public', 'watch']);
gulp.task('watch', function(){
    gulp.watch('./app/pages/**/*.html', ['html']);
    gulp.watch('./app/css/**/*.css', ['css']);
    gulp.watch('./app/js/**/*.js', ['js']);
    gulp.watch('./Tesla/app/img/**/*.*', ['img']);
});
gulp.task('del', function () {
    return del('./dist');
});
gulp.task('delfile', function () {
    return del('./dist/libs/bootstrap/dist/css/bootstrap.css');
});
gulp.task('html', function(){
    gulp.src('./app/pages/**/*.html')
        .pipe(minHTML())
        .pipe(gulp.dest('./dist/pages'));
    gulp.src('./app/index.html')
        .pipe(gulp.dest('dist'));
});
gulp.task('css', function(){
    gulp.src('./app/css/*.css')
        .pipe(concat('styles.css'))
        //off because delete styles for d3.js
        //.pipe(uncss({
        //    html: ['./Tesla/app/index.html', './Tesla/app/pages/**/*.html']
        //}))
        .pipe(minCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('js', function(){
    gulp.src('./app/js/**/*.js')
        .pipe(concat('scripts.js'))
    //off because breaks Angular. Need to use the inference style of dependency annotation
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('img', function(){
    gulp.src('./app/img/**/*.*')
        .pipe(gulp.dest('./dist/img'))
});
gulp.task('mainfiles', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('./dist/libs'));
});
gulp.task('minmain', ['mainfiles'], function(){
    gulp.src('./dist/libs/bootstrap/dist/css/bootstrap.css')
        .pipe(uncss({
            html: ['./app/index.html', './app/pages/**/*.html']
        }))
        .pipe(minCSS())
        .pipe(rename('bootstrap.min.css'))
        .pipe(gulp.dest('./dist/libs/bootstrap/dist/css/'));
});
gulp.task('public', function(callback) {
    runSequence('del',
        ['html', 'css', 'js', 'img', 'minmain'],
        'delfile',
        callback);
});