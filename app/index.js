/**
*
*  AVIONIC
*  Propelling World-class Cross-platform Hybrid Applications ✈.
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

  // Avionic ✈ ASCII Text Logo
  var logo =
  "\n" +
  chalk.cyan.bold("\n               ___ _    __________  _   ____________") +
  chalk.cyan.bold("\n              /   | |  / /  _/ __ \\/ | / /  _/ ____/") +
  chalk.cyan.bold("\n             / /| | | / // // / / /  |/ // // /     ") +
  chalk.cyan.bold("\n            / ___ | |/ // // /_/ / /|  // // /___   ") +
  chalk.cyan.bold("\n           /_/  |_|___/___/\\____/_/ |_/___/\\____/ ") +
  "\n"+
  chalk.cyan.bold("\n-- ") + chalk.yellow.bold("PROPELLING WORLD-CLASS CROSS-PLATFORM HYBRID APPLICATIONS") + chalk.cyan.bold(" -- ✈");

  var captain =
  "\n" +
  chalk.red.bold("                             .---. ") +
  chalk.red.bold("\n                            /_ ") + chalk.cyan.bold("✈") + chalk.red.bold(" _\\") +
  chalk.white.bold("\n                            ( '_' )") +
  chalk.white.bold("\n                             \\_-_/") +
  chalk.red.bold("\n                       >>>___  ~  ___<<<\n");

  var crew =
  "\n" +
  chalk.yellow.bold("                             .-- ") + chalk.cyan.bold("✈") + chalk.yellow.bold("") +
  chalk.yellow.bold("\n                            / /\"\\ \\") +
  chalk.yellow.bold("\n                            )/") + chalk.white.bold("a a") + chalk.yellow.bold("\\(") +
  chalk.yellow.bold("\n                           ( ") + chalk.white.bold("( - )") + chalk.yellow.bold(" )") +
  chalk.yellow.bold("\n                            )") + chalk.gray.bold("_") + chalk.yellow.bold("") + chalk.white.bold(") (") + chalk.yellow.bold("") + chalk.gray.bold("_") + chalk.yellow.bold("(") +
  chalk.gray.bold("\n                            '\\   /'") +
  chalk.gray.bold("\n                          /,(_\\ /_),\\") +
  chalk.gray.bold("\n                          \\\\ \\ ") + chalk.cyan.bold("✈") + chalk.gray.bold(" / //\n")
  ;

  var AvionicGenerator = module.exports = yeoman.generators.Base.extend({
    initializing: function () {
      this.pkg = require('../package.json');
      this.currentYear = (new Date()).getFullYear();
    },

    prompting: {

      askForNames: function askForNames() {
        var done = this.async();

        console.log(logo);
        console.log(captain);

        this.log(chalk.white.bold('This is your Captain, welcoming you aboard to Avionic. At this time,\nwe request your full attention as your inflight team will guide you\nthrough the safety features.\n'));
        console.log(crew);
        this.log(chalk.white.bold('All right, it\'s time for final cabin check. Please make sure to\nanswer the questions below. For additional safety information,\ncheck out Avionic.io.\n'));

        var prompts = [{
          type: 'input',
          name: 'appName',
          message: chalk.cyan('📝  Enter the name of your app as it will appear on the App Store:'),
          default: this.appname // Default to current folder name
        },
        {
          type: 'input',
          name: 'appDescription',
          message:chalk.cyan('📝  Enter a description:'),
          default: 'A world-class app powered by Avionic.'
        },
        {
          type: 'input',
          name: 'appKeywords',
          message:chalk.cyan('📝  Enter some keywords separated by commas:'),
          default: 'avionic,ionic,yeoman, gulp, html, js, css, ios, android'
        },
        {
          type: 'input',
          name: 'appUserName',
          message:chalk.cyan('📝  Enter your name:'),
          default: 'Charles Lindbergh'
        },
        {
          type: 'input',
          name: 'appUserEmail',
          message:chalk.cyan('📝  Enter your email address:'),
          default: 'email@example.com'

        }];

        this.prompt(prompts, function (props) {
          this.appName = props.appName;
          this.appDescription = props.appDescription;
          this.appKeywords = props.appKeywords;
          this.appUserName = props.appUserName;
          this.appUserEmail = props.appUserEmail;
          done();
        }.bind(this));
      },

      askForAppId: function askForAppId() {
        var done = this.async();
        this.prompt([{
          type: 'input',
          name: 'appId',
          message:chalk.cyan('📝  Enter the app id you\'d like to use'),
          default: 'com.' + this._.classify(this.appUserName).toLowerCase() + '.' + this._.classify(this.appName).toLowerCase()
        }], function (props) {
          this.appId = props.appId;
          done();
        }.bind(this));
      }

    },

    writing: {

      setup: function () {
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          {
            appName: this._.underscored(this.appName),
            appDescription: this._.underscored(this.appDescription),
            appKeywords: this._.underscored(this.appKeywords),
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail
          }
        );
        this.fs.copyTpl(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json'),
          {
            appName: this._.classify(this.appName),
            appDescription: this.appDescription,
            appKeywords: this._.classify(this.appKeywords),
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail
          }
        );

        this.fs.copyTpl(
          this.templatePath('_en.json'),
          this.destinationPath('app/languages/en.json'),
          {
            appName: this._.underscored(this.appName),
            appDescription: this._.underscored(this.appDescription),
            appKeywords: this._.underscored(this.appKeywords),
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail
          }
        );

        this.fs.copyTpl(
          this.templatePath('_config.xml'),
          this.destinationPath('config.xml'),
          {
            appName: this.appName,
            appDescription: this.appDescription,
            appKeywords: this.appKeywords,
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail,
            widgetId: this.appId
          }
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
          this.destinationPath('app/README.md'),
          {
            appName: this.appName,
            appDescription: this.appDescription,
            appKeywords: this.appKeywords,
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail,
            widgetId: this.appId
          }
        );

        this.fs.copyTpl(
          this.templatePath('./_CONTRIBUTING.md'),
          this.destinationPath('app/CONTRIBUTING.md'),
          {
            appName: this.appName,
            appDescription: this.appDescription,
            appKeywords: this.appKeywords,
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail,
            widgetId: this.appId
          }
        );

        this.fs.copyTpl(
          this.templatePath('./_LICENSE'),
          this.destinationPath('app/LICENSE'),
          {
            appName: this.appName,
            appDescription: this.appDescription,
            appKeywords: this.appKeywords,
            appUserName: this.appUserName,
            appUserEmail: this.appUserEmail,
            widgetId: this.appId
          }
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

      },

      projectfiles: function () {

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
          this.destinationPath('app/scripts/config/' + this._.classify(this.appname).toLowerCase() + '.config.js'),
          {
            ngModulName: this._.classify(this.appName)
          }
        );

        // translate
        this.fs.copyTpl(
          this.templatePath('scripts/translate/app.translate.js'),
          this.destinationPath('app/scripts/translate/' + this._.classify(this.appname).toLowerCase() + '.translate.js'),
          {
            ngModulName: this._.classify(this.appName)
          }
        );


        // routes
        this.fs.copyTpl(
          this.templatePath('scripts/routes/app.routes.js'),
          this.destinationPath('app/scripts/routes/' + this._.classify(this.appname).toLowerCase() + '.routes.js'),
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

        this.fs.copy(
          this.templatePath('_vendor.json'),
          this.destinationPath('vendor.json')
        );

        this.fs.copy(
          this.templatePath('_plugins.json'),
          this.destinationPath('plugins.json')
        );

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
      }
    },

    install: function () {
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    }
  });
}());
