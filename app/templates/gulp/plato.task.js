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
  var path = require('path');
  var imagemin = require('gulp-imagemin');
  var pngquant = require('imagemin-pngquant');
  var complexity = require('gulp-complexity');
  var complexityOpts = {
      errorsOnly: false,
      cyclomatic: 3,
      halstead: 10,
      maintainability : 90,
      trycatch: true
  };
  var glob = require('glob');
  var jshint = require('gulp-jshint');
  var jshintOpts = {
  	options : {
  		strict : true
  	}
  };
  var plato = require('plato');
  var files = glob.sync('app/scripts/**/*.js');
  var excludeFiles = /.*\.test\.js/;

  var platoOpts = {
    title: 'Avionic ✈ Plato Inspections Report',
    exclude: excludeFiles,
	  jshint     : jshintOpts,
	  complexity : complexityOpts
};

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

  /**
  * Create a visualizer report
  */
   gulp.task('plato', function(done) {
     'use strict';
     console.log('Analyzing source with Plato');
     console.log('Browse to /report/plato/index.html to see Plato results');
     startPlatoVisualizer(done);
   });

   function startPlatoVisualizer(done) {
     complexity();




     var outputDir = 'report/plato';

     plato.inspect(files, outputDir, platoOpts, platoCompleted);

     function platoCompleted(report) {
       plato.getOverviewReport(report);
        if (done) {
          done();
        }
      }
    }

}());
