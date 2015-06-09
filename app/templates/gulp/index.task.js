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
  var path = require('path');
  var streamqueue = require('streamqueue');
  var minifyHTML = require('gulp-minify-html');
  var filesize = require('gulp-filesize');
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

    // inject the files in index.html
    gulp.task('index', ['jshint', 'scripts'], function () {
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

          }());
