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

  var appName = '<%= ngModulName %>';
  var gulp = require('gulp');
  var plugins = require('gulp-load-plugins')({lazy: true});
  var streamqueue = require('streamqueue');
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


  // build templatecache, copy scripts.
  // if build: concat, minsafe, uglify and versionize
  gulp.task('scripts', function () {
    var dest = path.join(targetDir, 'scripts');

    var minifyConfig = {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeComments: true
    };

    // prepare angular template cache from html templates
    // (remember to change appName var to desired module name)
    var templateStream = gulp
    .src('**/*.html', { cwd: 'app/templates'})
    .pipe(plugins.angularTemplatecache('templates.js', {
      root: 'templates/',
      module: appName,
      htmlmin: build && minifyConfig
    }));

    var scriptStream = gulp
    .src(['templates.js', 'app.js', '**/*.js'], { cwd: 'app/scripts' })
    .pipe(plugins.if(!build, plugins.changed(dest)));
    return streamqueue({ objectMode: true }, scriptStream, templateStream)
    .pipe(plugins.if(build, plugins.ngAnnotate({add: true, single_quotes: true})))
    .pipe(plugins.if(stripDebug, plugins.stripDebug()))
    .pipe(plugins.if(build, plugins.concat('app.js')))
    .pipe(plugins.if(build, plugins.uglify({mangle: true, compress: true})))
    .pipe(plugins.if(build && !emulate, plugins.rev()))
    .pipe(gulp.dest(dest))
    .on('error', errorHandler);
  });

}());
