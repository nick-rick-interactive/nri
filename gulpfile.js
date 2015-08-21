var fs = require('fs');
var path = require('path');

var gulp = require('gulp');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var browserSync = require('browser-sync').create();

var cleancss = new LessPluginCleanCSS({ advanced : true });
var banner = new LessPluginAutoPrefix({ browsers : ['last 2 versions', 'ie >= 8', '> 1%'] });

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath)
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ], done);
});

gulp.task('copy', [
    'copy:.htaccess',
    'copy:license',
    'copy:misc',
    'copy:normalize'
]);

gulp.task('copy:.htaccess', function () {
    return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
               .pipe(plugins.replace(/# ErrorDocument/g, 'ErrorDocument'))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:license', function () {
    return gulp.src('LICENSE.txt')
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        dirs.src + '/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!' + dirs.src + '/js/**/*',
        '!' + dirs.src + '/js',
        '!' + dirs.src + '/less/*',
        '!' + dirs.src + '/less',
        '!' + dirs.src + '/composer.phar'

    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(dirs.dist + '/css'));
});


/* LINTING */

gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'));
    // .pipe(plugins.jshint.reporter('fail'));
});


/* COMPILING */

gulp.task('compile', [
    'compile:js',
    'compile:less'
]);

gulp.task('compile:dev', [
    'compile:js:dev',
    'compile:less'
]);

gulp.task('compile:less', function () {
    return gulp.src(dirs.src + '/less/main.less')
        .pipe(plugins.less({
            plugins:[banner, cleancss]
        }))
        .pipe(gulp.dest(dirs.dist + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('compile:js', function () {
    return gulp.src([
        dirs.src + '/js/vendor/modernizr-2.8.3.min.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/spin.js/spin.js',
        'bower_components/greensock-js/src/uncompressed/TweenMax.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-spinner/angular-spinner.js',
        dirs.src + '/js/controllers/*.js',
        dirs.src + '/js/app.js',
        dirs.src + '/js/main.js'
    ])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(rename('main.js'))
        .pipe(plugins.uglify({ mangle:false }))
        .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('compile:js:dev', function () {
    return gulp.src([
        dirs.src + '/js/vendor/modernizr-2.8.3.min.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/spin.js/spin.js',
        'bower_components/greensock-js/src/uncompressed/TweenMax.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-spinner/angular-spinner.js',
        dirs.src + '/js/controllers/*.js',
        dirs.src + '/js/app.js',
        dirs.src + '/js/main.js'
    ])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(rename('main.js'))
        .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('compile:js-watch', ['compile:js'], browserSync.reload);
gulp.task('compile:js-watch:dev', ['compile:js:dev'], browserSync.reload);
gulp.task('compile:views-watch', ['copy:misc'], browserSync.reload);

/* SERVER */

gulp.task('serve', function () {

    browserSync.init({
        proxy: 'http://localhost:63342/nri/dist/'
    });

    gulp.watch(dirs.src + '/less/main.less', ['compile:less']);
    gulp.watch(dirs.src + '/js/**/*.js', ['compile:js-watch']);
    gulp.watch(dirs.src + '/index.php', ['compile:views-watch']);
    gulp.watch(dirs.src + '/views/*', ['compile:views-watch']);
    gulp.watch(dirs.src + '/src/*', ['compile:views-watch']);

});

gulp.task('serve-dev', function () {

    browserSync.init({
        proxy: 'http://localhost:63342/nri/dist/'
    });

    gulp.watch(dirs.src + '/less/main.less', ['compile:less']);
    gulp.watch(dirs.src + '/js/**/*.js', ['compile:js-watch:dev']);
    gulp.watch(dirs.src + '/index.php', ['compile:views-watch']);
    gulp.watch(dirs.src + '/views/*', ['compile:views-watch']);
    gulp.watch(dirs.src + '/src/*', ['compile:views-watch']);

});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean'],
        'copy', 'compile', 'serve',
    done);
});

gulp.task('build-dev', function (done) {
    runSequence(
        ['clean'],
        'copy', 'compile:dev', 'serve-dev',
    done);
});

gulp.task('default', ['build']);
