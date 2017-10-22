const gulp = require('gulp');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const templateCache = require('gulp-angular-templatecache');
const minifyHtml = require('gulp-minify-html');
const ngAnnotate = require('gulp-ng-annotate');
const gulpUglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');

const outputPaths = 'assets/public/compiled';
let prod = false;

const inputPaths = {
    js: 'assets/js/**/*.js',
    templates: 'assets/js/**/*.html'
};

/*
 Merge js files
*/
gulp.task('js', function(completed) {
    gulp.src(inputPaths.js)
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(concat('scripts.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate({
            single_quotes: true,
        }))
        .pipe(gulpif(prod, gulpUglify()))
        .pipe(gulpif(!prod, sourcemaps.write('.', {
            sourceRoot: '/source/js',
        })))
        .pipe(gulp.dest(outputPaths))
        .on('end', completed);
});

/*
Angular templates 
*/
gulp.task('templates', function (completed) {
    gulp.src(inputPaths.templates)
        .pipe(minifyHtml({
            empty: true, 
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            module: 'app'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(outputPaths))
        .on('end', completed);
});

/*
Watch for file changes in js 
*/
gulp.task('watch', function() {
    gulp.watch(inputPaths.templates, ['templates']);
    gulp.watch(inputPaths.js, ['js']);
});

/*
Prod Compiler
*/
gulp.task('default', function(cb) {
    prod = true;
    runSequence(['js', 'templates'], cb);
});

/*
Dev helper
*/
gulp.task('dev', ['js', 'templates', 'watch']);