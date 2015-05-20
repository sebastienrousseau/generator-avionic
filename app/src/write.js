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
  // var options = require('../options.json');

  module.exports = function(AvionicGenerator) {
    /**
    * Declares options in the generator (only used for the help messages)
    */
    AvionicGenerator.prototype.setup = function setup() {

      var appArguments = {
        appName:this._.titleize(this.appName),
        appDescription: this._.titleize(this.appDescription),
        appKeywords: this._.humanize(this.appKeywords).toLowerCase(),
        appUserName: this._.titleize(this.appUserName),
        appUserEmail: this.appUserEmail.toLowerCase(),
        appId: this.appId,
        appYear: this.appYear,
        appVersion: this.appVersion,
        widgetId: this.appId.toLowerCase()
      };

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        appArguments
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        appArguments
      );
      this.fs.copyTpl(
        this.templatePath('_en.json'),
        this.destinationPath('app/languages/en.json'),
        appArguments
      );
      this.fs.copyTpl(
        this.templatePath('_config.xml'),
        this.destinationPath('config.xml'),
        appArguments
      );
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('./_README.md'),
        this.destinationPath('README.md'),
        appArguments
      );
      this.fs.copyTpl(
        this.templatePath('./_CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md'),
        appArguments
      );
      this.fs.copyTpl(
        this.templatePath('./_LICENSE'),
        this.destinationPath('LICENSE'),
        appArguments
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.mkdir('helpers');
      this.mkdir('www');
      this.fs.copy(
        this.templatePath('helpers/emulateios'),
        this.destinationPath('helpers/emulateios')
      );
    };

    AvionicGenerator.prototype.install = function install() {
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    };
  };
}());
