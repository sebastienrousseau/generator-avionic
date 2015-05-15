
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
  chalk.cyan("\n    ___ _    __________  _   ____________") +
  chalk.cyan("\n   /   | |  / /  _/ __ \\/ | / /  _/ ____/") +
  chalk.cyan("\n  / /| | | / // // / / /  |/ // // /     ") +
  chalk.cyan("\n / ___ | |/ // // /_/ / /|  // // /___   ") +
  chalk.cyan("\n/_/  |_|___/___/\\____/_/ |_/___/\\____/ ") +
  "\n"+
  chalk.cyan("\nPROPELLING WORLD-CLASS CROSS-PLATFORM HYBRID APPLICATIONS ✈") +
  chalk.cyan("\nA Yeoman generator using AngularJS, Express, ngCordova, Gulp and Bower that helps you kickstart highly sophisticated Ionic projects to evolve and upgrade every aspect of your development to the next moonshot.") +
  "\n";

  var AvionicGenerator = module.exports = yeoman.generators.Base.extend({
    initializing: function () {
      this.pkg = require('../package.json');
      this.currentYear = (new Date()).getFullYear();
    },

    prompting: {

      askForNames: function askForNames() {
        var done = this.async();

        console.log(logo);

        // Have Yeoman greet the user.
        this.log(chalk.yellow('Ladies and gentlemen, this is your captain, welcoming you aboard to the Avionic installer.'));
        this.log(yosay(chalk.yellow('At this time, we request your full attention as the flight attendants will guide you through the safety features of this aircraft.\n')));

        var prompts = [{
          type: 'input',
          name: 'appName',
          message: '▶︎ OK, so this one is important for all you Pilots out there. Please enter a name for your app',
          default: this.appname // Default to current folder name
        },
        {
          type: 'input',
          name: 'appDescription',
          message: '▶︎ Enter a description:',
          default: 'A world-class app powered by Avionic ✈.'
        },
        {
          type: 'input',
          name: 'appKeywords',
          message: '▶︎ Enter some keywords separated by commas:',
          default: 'avionic,ionic,yeoman, gulp, html, js, css, ios, android'
        },
        {
          type: 'input',
          name: 'userName',
          message: '▶︎ Enter your name:',
          default: 'Charles Lindbergh'
        },
        {
          type: 'input',
          name: 'userMail',
          message: '▶︎ Enter your email address:',
          default: 'email@example.com'

        }];

        this.prompt(prompts, function (props) {
          this.appName = props.appName;
          this.appDescription = props.appDescription;
          this.appKeywords = props.appKeywords;
          this.userName = props.userName;
          this.userMail = props.userMail;
          done();
        }.bind(this));
      },

      askForAppId: function askForAppId() {
        var done = this.async();
        this.prompt([{
          type: 'input',
          name: 'appId',
          message: '▶︎ Please enter the app id you\'d lile to use',
          default: 'com.' + this._.classify(this.userName).toLowerCase() + '.' + this._.classify(this.appName).toLowerCase()
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
            userName: this.userName,
            userEmail: this.userMail
          }
        );
        this.fs.copyTpl(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json'),
          {
            appName: this._.classify(this.appName),
            appDescription: this._.classify(this.appDescription),
            appKeywords: this._.classify(this.appKeywords),
            userName: this.userName,
            userEmail: this.userMail
          }
        );

        this.fs.copyTpl(
          this.templatePath('_en.json'),
          this.destinationPath('app/languages/en.json'),
          {
            ngModulName: this._.classify(this.appName)
          }
        );

        this.fs.copyTpl(
          this.templatePath('_config.xml'),
          this.destinationPath('config.xml'),
          {
            appName: this.appName,
            appDescription: this.appDescription,
            appKeywords: this.appKeywords,
            userName: this.userName,
            userEmail: this.userMail,
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
            author: this.userName,
            ngModulName: this._.classify(this.appName),
            ngModulDescription: this._.classify(this.appDescription),
            ngModulKeywords: this._.classify(this.appKeywords),
            ngModulAuthor: this._.classify(this.userName)
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
