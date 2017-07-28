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
        .pipe(processhtml({
            recursive: true
        }))
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream: true}));
});
/* Images */
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images/'))
        .pipe(gulp.dest('build/images/')).pipe(reload({stream: true}));
});
/* Icons */
// gulp.task('icons', function () {
//     return gulp.src('src/icons/*.svg')
//         .pipe(gulp.dest('build/icons/'))
//         .pipe(gulp.dest('build/icons/')).pipe(reload({stream: true}));
// });
/* Fonts */
gulp.task('fonts', function () {
    return gulp.src('src/styles/fonts/*')
        .pipe(gulp.dest('build/styles/fonts/'))
        .pipe(gulp.dest('build/styles/fonts/')).pipe(reload({stream: true}));
});
/* JavaScript */
gulp.task('js', function () {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('build/scripts/'))
        .pipe(gulp.dest('build/scripts/')).pipe(reload({stream: true}));
});
/* Styles */
gulp.task('less', function () {
    return gulp.src([
        'src/styles/fonts/*.less',
        'src/styles/components/*.less'
    ])
        .pipe(less({
            paths: [path.join('src/styles', 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('collect', function () {
    return gulp.src('build/styles/*.css')
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('build/styles'));
});
gulp.task('minificate', function(){
    return gulp.src('build/styles/style.css')
        .pipe(gulpIf('*.css', cssnano()))
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
    // watch('src/icons/*.svg', function (event, cb) {
    //     gulp.start('icons');
    // });
    watch(['src/styles/*.less'], function (event, cb) {
        gulp.start('less');
    });
});
/* Default */
gulp.task('default', ['watch'], function () {
});
