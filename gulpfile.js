var gulp        = require("gulp");
var serve       = require("gulp-serve");
var concat      = require("gulp-concat");
var uglify      = require("gulp-uglify");
var rename      = require("gulp-rename");
var browserSync = require("browser-sync").create();
var source      = require("vinyl-source-stream");
var buffer      = require("vinyl-buffer");
var browserify  = require("browserify");
var argv        = require("yargs").argv;
var chalk       = require("chalk");

var ROOTPATH = "/";
var SERVER   = "http://localhost:8000";
var PREFIX_PATH = {
  src: '',
  dist: ''
};
var PATH = {
  js     : {
    entry: PREFIX_PATH.src + "/_js/app.js",
    src:   PREFIX_PATH.src + "/_js/**/*.js",
    dist:  PREFIX_PATH.dist + "/assets/js"
  }
};

// Static server + watching asset files
gulp.task('serve', ['browserify'], function() {
  var sync = argv.browserify ? argv.browserify : 'false';
  if (sync === 'true') {
    browserSync.init({
      proxy: SERVER
    });
    gulp.watch(PATH.js.src, ['js-watch']);
  } else {
    gulp.watch(PATH.js.src, ['browserify']);
  }
});

// Compile all js files into one file
gulp.task('browserify', function() {
  return browserify(PATH.js.entry)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(PATH.js.dist));
});

gulp.task('js-watch', ['browserify'], function(done) {
  browserSync.reload();
  done();
});

// Export assets to other directory
// accept three argument:
// path = main directory target's path (required),
// sass = sass folder (optional),
// js = js folder (optional)
gulp.task('export-assets', function(done) {
  var sassPath = argv.sass ? argv.sass : '/assets/sass';
  var jsPath = argv.js ? argv.js : '/assets/js';

  if (argv.path === undefined) {
    console.log(chalk.red('Please provide path parameter by using --path flag'));
  } else {
    console.log('Target path: ' + chalk.cyan(argv.path));
    gulp.src(PATH.sass.src)
      .pipe(gulp.dest(argv.path + sassPath))
      .on('end', function() { console.log('Copying sass files: ' + chalk.cyan('Done')); });
    gulp.src(PATH.js.src)
      .pipe(gulp.dest(argv.path + jsPath))
      .on('end', function() { console.log('Copying js files: ' + chalk.cyan('Done')); });
  }

  return done();
});

// Main task
gulp.task('default', ['serve']);
