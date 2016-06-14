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
  requireDir('./gulp/', { recurse: true });

  /*jslint nomen: true*/
  /*jslint vars: true*/
  /*global require,process,module*/
  /*var appName = '<%= appName %>';*/
  /*var colorCSS = '<%= appColor%>';*/
  var chalk = require('chalk');
  var gulp = require('gulp');
  var beep = require('beepbeep');
  var plugins = require('gulp-load-plugins')({lazy: true});
  var path = require('path');





  /*var wiredep = require('wiredep').stream;*/
  /*var gutil = require('gulp-util');*/
  // var clean = require('gulp-clean');
  /*var sass = require('gulp-sass');*/
  /*var minifyHTML = require('gulp-minify-html');*/
  /*var rename = require('gulp-rename');*/
  /*var filesize = require('gulp-filesize');*/
  /*var sourcemaps = require('gulp-sourcemaps');*/
  /*var del = require('del');*/

  /*var express = require('express');*/

  /*var open = require('open');*/
  //var stylish = require('jshint-stylish');
  /*var livereload = require('connect-livereload');*/
  /*var streamqueue = require('streamqueue');*/
  /*var runSequence = require('run-sequence');*/
  /*var merge = require('merge-stream');*/
  /*var ripple = require('ripple-emulator');*/
  /*var minifyCss = require('gulp-clean-css');*/
  /*var replace = require('gulp-replace');*/
  /*var exec = require('child_process').exec;*/

  /*var imagemin = require('gulp-imagemin');
  var pngquant = require('imagemin-pngquant');*/
  /*var ascii = require('./ascii.js');*/

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

})();
