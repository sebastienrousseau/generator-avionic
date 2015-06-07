/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈
*
*  Copyright 2015 Reedia Limited. All rights reserved.
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.

*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*
*/
(function () {
  'use strict';

  var requireDir = require('require-dir');

  // Require all tasks in gulp/tasks, including subfolders
  requireDir('./gulp/tasks', { recurse: true });

  /*jslint nomen: true*/
  /*jslint vars: true*/
  /*global require,process,module*/
  var appName = '<%= appName %>';
  var chalk = require('chalk');
  var gulp = require('gulp');
  var wiredep = require('wiredep').stream;
  var plugins = require('gulp-load-plugins')({lazy: true});
  var gutil = require('gulp-util');
  // var clean = require('gulp-clean');
  var sass = require('gulp-sass');
  var minifyHTML = require('gulp-minify-html');
  var rename = require('gulp-rename');
  var filesize = require('gulp-filesize');
  var sourcemaps = require('gulp-sourcemaps');
  var del = require('del');
  var beep = require('beepbeep');
  var express = require('express');
  var path = require('path');
  var open = require('open');
  var stylish = require('jshint-stylish');
  var livereload = require('connect-livereload');
  var streamqueue = require('streamqueue');
  var runSequence = require('run-sequence');
  var merge = require('merge-stream');
  var ripple = require('ripple-emulator');
  var minifyCss = require('gulp-minify-css');
  var replace = require('gulp-replace');
  var exec = require('child_process').exec;

  var imagemin = require('gulp-imagemin');
  var pngquant = require('imagemin-pngquant');
  var ascii = require('./ascii.js');

  /**
  * Parse arguments
  */
  var args = require('yargs')
  .alias('e', 'emulate')
  .alias('b', 'build')
  .alias('r', 'run')
  // remove all debug messages (console.logs, alerts etc) from release build
  .alias('release', 'strip-debug')
  .default('build', false)
  .default('port', 9000)
  .default('strip-debug', false)
  .argv;
  var build = !!(args.build || args.emulate || args.run);
  var emulate = args.emulate;
  var run = args.run;
  var port = args.port;
  var stripDebug = !!args.stripDebug;
  var targetDir = path.resolve(build ? 'www' : '.tmp');

  // if we just use emulate or run without specifying platform, we assume iOS
  // in this case the value returned from yargs would just be true
  if (emulate === true) {
    emulate = 'ios';
  }

  if (run === true) {
    run = 'ios';
  }

  // global error handler
  var errorHandler = function (error) {
    if (build) {
      throw error;
    } else {
      beep(2, 170);
      plugins.util.log(error);
    }
  };


  // precompile .scss and concat with ionic.css
  gulp.task('styles', function () {
    var colorCSS = '<%= appColor%>';
    var options = build ? { style: 'compressed' } : { style: 'expanded' };
    var sassStream = plugins.rubySass('app/styles/main.scss', options)
    .pipe(plugins.autoprefixer('last 1 Chrome version', 'last 3 iOS versions', 'last 3 Android versions'));

    var cssStream = gulp.src(targetDir+'/styles/avionic.css');
    // console.log(targetDir+'/styles/avionic.css');
    return streamqueue({ objectMode: true }, cssStream, sassStream)
    .pipe(plugins.concat('main.css'))
    .pipe(replace('/*!', '/*'))
    .pipe(plugins.if(build, plugins.stripCssComments()))
    .pipe(plugins.if(build, minifyCss()))
    .pipe(plugins.if(build && !emulate, plugins.rev()))
    .pipe(gulp.dest(path.join(targetDir, 'styles')))
    .on('error', errorHandler);
  });


  // copy images
  gulp.task('images', function () {
    return gulp.src('app/images/**/*.*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.join(targetDir, 'images')))
    .on('error', errorHandler);
  });

  // copy favicon
  gulp.task('favicon', function () {
    return gulp.src('app/favicon.ico')
    .pipe(gulp.dest(path.join(targetDir)))
    .on('error', errorHandler);
  });

  // lint js sources based on .jshintrc ruleset
  gulp.task('jsHint', function () {
    return gulp
    .src('app/scripts/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish))
    .on('error', errorHandler);
  });

  // concatenate and minify vendor sources
  gulp.task('vendor', function () {
    var vendorFiles = require('./vendor.json');
    return gulp.src(vendorFiles)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(build, plugins.uglify()))
    .pipe(plugins.if(build, plugins.rev()))
    .pipe(gulp.dest(targetDir))
    .on('error', errorHandler);
  });

  gulp.task('cordova-plugin-install', function() {
    require('./plugins.json').forEach(function(plugin) {
      exec('cordova plugin add ' + plugin, {async: false}, function(code, output) {
        console.log(output);
      });
    });
  });

  // languages sources
  gulp.task('languages', function () {
    return gulp.src('app/languages/*.*')
    .pipe(gulp.dest(path.join(targetDir, 'languages')))
    // .pipe(plugins.if(build, plugins.uglify()))
    // .pipe(plugins.if(build, plugins.rev()))
    .on('error', errorHandler);
  });


  // inject the files in index.html
  gulp.task('index', ['jsHint', 'scripts'], function () {
    // build has a '-versionnumber' suffix
    var cssNaming = 'styles/main*';
    // injects 'src' into index.html at position 'tag'
    var _inject = function (src, tag) {
      return plugins.inject(src, {
        starttag: '<!-- inject:' + tag + ':{{ext}} -->',
        read: false,
        addRootSlash: false
      });
    };

    // get all our javascript sources
    // in development mode, it's better to add each file seperately.
    // it makes debugging easier.
    var _getAllScriptSources = function () {
      var scriptStream = gulp.src(['scripts/app.js', 'scripts/**/*.js'], { cwd: targetDir });
      return streamqueue({ objectMode: true }, scriptStream);
    };

    return gulp.src('app/index.html')
    // inject css
    .pipe(_inject(gulp.src(cssNaming, { cwd: targetDir }), 'app-styles'))
    // inject vendor.js
    .pipe(_inject(gulp.src('vendor*.js', { cwd: targetDir }), 'vendor'))
    // inject app.js (build) or all js files indivually (dev)
    .pipe(plugins.if(build,
      _inject(gulp.src('scripts/app*.js', { cwd: targetDir }), 'app'),
      _inject(_getAllScriptSources(), 'app')
    ))
    // Minifying html at build
    .pipe(plugins.if(build, minifyHTML()))
    // Print html filesize
    .pipe(filesize())
    .pipe(gulp.dest(targetDir))
    .on('error', errorHandler);
  });

  // start local express server
  gulp.task('serve', function () {
    express()
    .use(!build ? livereload() : function () {})
    .use(express.static(targetDir))
    .listen(port);
    open('http://localhost:' + port + '/');
    ascii.captain();
    gutil.log(gutil.colors.white.bold('<%= appName %> is cleared to takeoff!\n'));
    ascii.crew();
    gutil.log(gutil.colors.white.bold('\nAll right, it\’s time for final cabin check. For additional safety\ninformation, check out our website http://avionic.io.\nEnjoy your flight, and as always thank you for flying Avionic.\n'));
    ascii.plane();
    gutil.log(gutil.colors.white.bold('Goodbye.'));
  });


  // avionic CLI scripts

  /*
  // avionic CLI scripts
  gulp.task('av:android', plugins.shell.task([
  'cordova platform add android'
]));

gulp.task('av:ios', plugins.shell.task([
'cordova platform add ios'
]));

gulp.task('av:emulate', plugins.shell.task([
'cordova run --emulator'
]));

gulp.task('av:build', plugins.shell.task([
'gulp --build'
]));

gulp.task('av:serve', plugins.shell.task([
'gulp'
]));

gulp.task('av:resources', plugins.shell.task([
'ionic resources'
]));

gulp.task('av:icon', plugins.shell.task([
'ionic resources --icon'
]));

gulp.task('av:splash', plugins.shell.task([
'ionic resources --splash'
]));

gulp.task('av:run', plugins.shell.task([
'cordova run --device'
]));

*/

// ionic emulate wrapper
gulp.task('ionic:emulate', plugins.shell.task([
  'ionic emulate ' + emulate + ' --livereload --consolelogs'
]));

// ionic run wrapper
gulp.task('ionic:run', plugins.shell.task([
  'ionic run ' + run
]));

// ionic resources wrapper
gulp.task('icon', plugins.shell.task([
  'ionic resources --icon'
]));
gulp.task('splash', plugins.shell.task([
  'ionic resources --splash'
]));
gulp.task('resources', plugins.shell.task([
  'ionic resources'
]));

// select emulator device
gulp.task('select', plugins.shell.task([
  './helpers/emulateios'
]));

// ripple emulator
gulp.task('ripple', ['scripts', 'styles', 'watchers'], function () {

  var options = {
    keepAlive: false,
    open: true,
    port: 4400
  };

  // Start the ripple server
  ripple.emulate.start(options);

  open('http://localhost:' + options.port + '?enableripple=true');
});


// start watchers
gulp.task('watchers', function () {
  plugins.livereload.listen();
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**', ['fonts']);
  gulp.watch('app/icons/**', ['iconfont']);
  gulp.watch('app/images/**', ['images']);
  gulp.watch('app/favicon.ico', ['favicon']);
  gulp.watch('app/scripts/**/*.js', ['index']);
  gulp.watch('./vendor.json', ['vendor']);
  gulp.watch('app/languages/*.json', ['languages']);
  gulp.watch('app/LICENSE', ['licenses']);
  gulp.watch('app/*.md', ['licenses']);
  gulp.watch('app/templates/**/*.html', ['index']);
  gulp.watch('app/index.html', ['index']);
  gulp.watch(targetDir + '/**')
  .on('change', plugins.livereload.changed)
  .on('error', errorHandler);
});

// no-op = empty function
gulp.task('noop', function () {});

// our main sequence, with some conditional jobs depending on params
gulp.task('default', function(done) {
  ascii.captain();
  gutil.log(gutil.colors.white('\nCabin crew, doors on automatic, cross-check & report. Thank you.\n'));
  ascii.crew();
  gutil.log(gutil.colors.white('\nIn a few moments, we will be passing around the cabin to\noffer you hot or cold drinks.\nPlease, sit back, relax, and enjoy the flight.\n'));
  ascii.captain();
  gutil.log(gutil.colors.white('\nStarting initializing the Gulp sequence, local time is:\n'));

  runSequence(
    'clean',
    'iconfont',
    [
      'licenses',
      'fonts',
      'templates',
      'styles',
      'favicon',
      'images',
      'vendor',
      'languages'
    ],
    'index',
    build ? 'noop' : 'watchers',
    build ? 'noop' : 'serve',
    emulate ? ['ionic:emulate', 'watchers'] : 'noop',
    run ? 'ionic:run' : 'noop',
    done);
  });
  ascii.plane();
  gutil.log(gutil.colors.white('Flight \"<%= appName %>\" is ready for takeoff.'));
})();
