/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈ ✈
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
  /*jslint nomen: true*/
  /*jslint vars: true*/
  /*global require,process,module*/
  var yeoman = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');
  var path = require('path');
  var cordova = require('cordova');
  // var options = require('../options.json');

  module.exports = function(AvionicGenerator) {
    /**
    * Declares options in the generator (only used for the help messages)
    */
    AvionicGenerator.prototype.install = function install() {

      console.log(chalk.yellow('\nInstall plugins registered at plugins.cordova.io: ') + chalk.green('gulp plugin:add:org.apache.cordova.globalization'));
      console.log(chalk.yellow('Or install plugins direct from source: ') + chalk.green('gulp plugin:add:https://github.com/apache/cordova-plugin-console.git\n'));
      if (this.plugins.length > 0) {
          console.log(chalk.yellow('Installing selected Cordova plugins, please wait.'));
          // Turns out plugin() doesn't accept a callback so we try/catch instead
          try {
              // cordova.plugin('add', this.plugins);
              cordova.plugin('add', this.plugins, { save: true });
              // var appPlugins = this.plugins.join(', ');
              this.log(chalk.green('Added plugins: ' + this.plugins));
          } catch (e) {
              console.log(e);
              this.log.error(chalk.red('Please run `yo icnh-ionic` in an empty directory, or in that of an already existing cordova project.'));
              process.exit(1);
          }
      }

      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    };
  };
}());
