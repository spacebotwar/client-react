var gulp        = require('gulp');
var gutil       = require('gulp-util');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var watchify    = require('watchify');
var browserSync = require('browser-sync').create();

var paths = {
    HTML: 'app/index.html',
    ALL: ['app/js/*.{js,jsx}', 'app/js/**/*.{js,jsx}', 'app/index.html'],
    JS: ['app/js/*.{js,jsx}', 'app/js/**/*.{js,jsx}'],
    OUT: 'build.js',
    DEST_BUILD: 'dist/build',
    DEST: 'dist',
    ENTRY_POINT: __dirname + '/app/js/App.jsx'
};

gulp.task('build', function() {

    return browserify({
        extensions: ['js','jsx'],
        entries: paths.ENTRY_POINT,
        debug: true
       // paths: './bower_components'

    })
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/
        }))
        .bundle()
        .on('error', gutil.log)
        .pipe(source(paths.OUT))
        .pipe(gulp.dest(paths.DEST_BUILD));
});

gulp.task('default', ['build']);

