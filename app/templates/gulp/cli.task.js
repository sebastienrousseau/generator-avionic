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

  var gulp = require('gulp');
  var beep = require('beepbeep');
  var plugins = require('gulp-load-plugins')({lazy: true});
  var path = require('path');
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

  // Avionic Temporary CLI scripts

  // Run application in an iOS device
  gulp.task('avionic:ios', plugins.shell.task([
    'av:build' && 'av:ios' && 'av:resources' && 'av:run'
  ]));

  // Run application in an Android device
  gulp.task('avionic:android', plugins.shell.task([
    'av:build' && 'av:android' && 'av:resources' && 'av:run'
  ]));

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

})();
