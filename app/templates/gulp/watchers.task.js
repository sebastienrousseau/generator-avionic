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
  var plugins = require('gulp-load-plugins')({lazy: true});
  var livereload = require('connect-livereload');
  var path = require('path');
  var beep = require('beepbeep');
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

  // global error handler
  var errorHandler = function (error) {
    if (build) {
      throw error;
    } else {
      beep(2, 170);
      plugins.util.log(error);
    }
  };

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

}());
