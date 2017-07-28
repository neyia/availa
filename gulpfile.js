/**
 * Created by nzhyrkova on 21.01.2017.
 */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    processhtml = require('gulp-processhtml'),
    less = require('gulp-less'),
    path = require('path'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    watch = require('gulp-watch'),
    cssnano = require('gulp-cssnano'),
    gulpIf = require('gulp-if'),
    concatCss = require('gulp-concat-css');

var config = {
    server: {
        baseDir: "build"
    },
    tunnel: true,
    host: 'localhost',
    port: 8040,
    open: true,
    notify: false,
    injectChanges: true,
    logPrefix: "availa"
};
gulp.task('webserver', function () {
    browserSync(config);
});
/* HTML */
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(processhtml({recursive: true}))
        .pipe(gulp.dest('build/')).pipe(reload({stream: true}));
});
/* Images */
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images/')).pipe(reload({stream: true}));
});
/* Fonts */
gulp.task('fonts', function () {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts/')).pipe(reload({stream: true}));
});
/* JavaScript */
gulp.task('js', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('build/scripts/')).pipe(reload({stream: true}));
});
/* Styles */
gulp.task('less', function () {
    return gulp.src([
        'src/styles/styles.less'
    ])
    .pipe(less({
        paths: [path.join('src/styles', 'less', 'components')]
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src/css')).pipe(reload({stream: true}));
});

gulp.task('minificate', function(){
    return gulp.src('src/css/styles.css')
        .pipe(gulpIf('styles.css', cssnano()))
        .pipe(gulp.dest('build/styles'))
        .pipe(reload({stream: true}));
});
/* BrowserSync local web server*/
gulp.task('watch', ['webserver'], function () {
    watch([
        'src/styles/fonts/*.ttf',
        'src/styles/fonts/*.eot',
        'src/styles/fonts/*.svg'
    ], function (event, cb) {
        gulp.start('fonts');
    });
    watch(['src/scripts/*.js'], function (event, cb) {
        gulp.start('js');
    });
    watch('src/*.html', function (event, cb) {
        gulp.start('html');
    });
    watch('src/images/*.png', function (event, cb) {
        gulp.start('images');
    });
    watch(['src/styles/*.less'], function (event, cb) {
        gulp.start('less');
    });
    watch(['build/styles/styles.css'], function (event, cb) {
        gulp.start('minificate');
    });
});
/* Default */
gulp.task('default', ['watch'], function () {
});
