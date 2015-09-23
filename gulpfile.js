var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass');

var paths = {
    dist: './public/dist',
    js: ['./public/src/**/*.js'],
    scss: ['./public/src/**/*.scss']
};

gulp.task('js:watch', function () {
    gulp.watch(paths.js, ['js']);
});

gulp.task('js', function () {
    browserify({
        entries: './public/src/main.js',
        extensions: ['.js'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('sass', function () {
    gulp.src('./public/src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist));
});
 
gulp.task('sass:watch', function () {
    gulp.watch(paths.scss, ['sass']);
});

gulp.task('default', ['js:watch', 'sass:watch', 'js', 'sass']);