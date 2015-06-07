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
  /*jslint nomen: true*/
  /*jslint vars: true*/
  /*global require,process,module*/
  var yeoman = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');
  var path = require('path');
  // var fontName = 'avionic'; // set name of your symbol font

  // var options = require('../options.json');

  module.exports = function(AvionicGenerator) {
    /**
    * Declares options in the generator (only used for the help messages)
    */
    AvionicGenerator.prototype.projectfiles = function projectfiles() {

      this.directory('app', 'app');
      this.directory('hooks', 'hooks');

      this.mkdir('server');
      this.mkdir('app/icons');
      this.mkdir('app/images');
      this.mkdir('resources');

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          title: this.appName,
          description: this.appDescription,
          keywords: this.appKeywords,
          author: this.appUserName,
          ngModulName: this._.classify(this.appName),
          ngModulDescription: this._.classify(this.appDescription),
          ngModulKeywords: this._.classify(this.appKeywords),
          ngModulAuthor: this._.classify(this.appUserName)
        }
      );
      // services
      this.fs.copyTpl(
        this.templatePath('scripts/services/user.service.js'),
        this.destinationPath('app/scripts/services/user.service.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/services/example.service.js'),
        this.destinationPath('app/scripts/services/example.service.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/services/api.service.js'),
        this.destinationPath('app/scripts/services/api.service.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/services/localstorage.service.js'),
        this.destinationPath('app/scripts/services/localstorage.service.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/services/auth.service.js'),
        this.destinationPath('app/scripts/services/auth.service.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );

      // controllers
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/translateController.js'),
        this.destinationPath('app/scripts/controllers/translateController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/loginController.js'),
        this.destinationPath('app/scripts/controllers/loginController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/signupController.js'),
        this.destinationPath('app/scripts/controllers/signupController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/homeController.js'),
        this.destinationPath('app/scripts/controllers/homeController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/productsController.js'),
        this.destinationPath('app/scripts/controllers/productsController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/productController.js'),
        this.destinationPath('app/scripts/controllers/productController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/newProductController.js'),
        this.destinationPath('app/scripts/controllers/newProductController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/editProductController.js'),
        this.destinationPath('app/scripts/controllers/editProductController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/mainController.js'),
        this.destinationPath('app/scripts/controllers/mainController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('scripts/controllers/settingsController.js'),
        this.destinationPath('app/scripts/controllers/settingsController.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );


      // config
      this.fs.copyTpl(
        this.templatePath('scripts/config/app.config.js'),
        this.destinationPath('app/scripts/config/' + this._.classify(this.appName).toLowerCase() + '.config.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );

      // translate
      this.fs.copyTpl(
        this.templatePath('scripts/translate/app.translate.js'),
        this.destinationPath('app/scripts/translate/' + this._.classify(this.appName).toLowerCase() + '.translate.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );


      // routes
      this.fs.copyTpl(
        this.templatePath('scripts/routes/app.routes.js'),
        this.destinationPath('app/scripts/routes/' + this._.classify(this.appName).toLowerCase() + '.routes.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );

      // gulp tasks
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/help.js'),
        this.destinationPath('gulp/tasks/help.js')
      );
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/scripts.js'),
        this.destinationPath('gulp/tasks/scripts.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/clean.js'),
        this.destinationPath('gulp/tasks/clean.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/fonts.js'),
        this.destinationPath('gulp/tasks/fonts.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/licenses.js'),
        this.destinationPath('gulp/tasks/licenses.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/templates.js'),
        this.destinationPath('gulp/tasks/templates.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );
      this.fs.copyTpl(
        this.templatePath('gulp/tasks/iconfont.js'),
        this.destinationPath('gulp/tasks/iconfont.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );

      // utils
      this.fs.copyTpl(
        this.templatePath('scripts/utils/lodash.js'),
        this.destinationPath('app/scripts/utils/lodash.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );

      // app
      this.fs.copyTpl(
        this.templatePath('scripts/app.js'),
        this.destinationPath('app/scripts/app.js'),
        {
          ngModulName: this._.classify(this.appName)
        }
      );

      this.fs.copy(
        this.templatePath('server'),
        this.destinationPath('server')
      );

      // this.fs.copy(
      //   this.templatePath('_avionic.css'),
      //   this.destinationPath('app/styles/icons/avionic.css'),
      //   {
      //     fontName: this._.classify(this.fontName)
      //   }
      // );

      this.fs.copy(
        this.templatePath('_vendor.json'),
        this.destinationPath('vendor.json')
      );

      // this.fs.copy(
      //   this.templatePath('_plugins.json'),
      //   this.destinationPath('plugins.json')
      // );

      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('app/favicon.ico')
      );

      this.fs.copy(
        this.templatePath('splash.png'),
        this.destinationPath('resources/splash.png')
      );

      this.fs.copy(
        this.templatePath('icon.png'),
        this.destinationPath('resources/icon.png')
      );
    };
  };
}());
