(function() {
  'use strict';
  var yeoman = require('yeoman-generator');
  var chalk = require('chalk');
  var yosay = require('yosay');
  var path = require('path');

  var appPath = path.join(process.cwd(), 'app');

  module.exports = yeoman.generators.Base.extend({
    initializing: function () {
      this.pkg = require('../package.json');
    },

    prompting: {

      askForNames: function askForNames() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
          'Ladies and gentlemen, this is your captain, welcoming you aboard to the ' + chalk.red('Avionic ✈ Installer') + ''
        ));

        this.log(
          'At this time, we request your full attention \nas the flight attendants will guide you through \nthe safety features of this aircraft.\n'
        );

        var prompts = [{
          type: 'input',
          name: 'appName',
          message: 'Please enter a name for your Avionic ✈ app:',
          default : this.appname // Default to current folder name
        },
        {
          type: 'input',
          name: 'userName',
          message: 'Please enter your name:',
          default : 'Charles Lindbergh'
        },
        {
          type: 'input',
          name: 'userMail',
          message: 'Please enter your email address:',
          default : 'email@example.com'

        }];

        this.prompt(prompts, function(props) {
          this.appName = props.appName;
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
          message: 'The app id?',
          default : 'com.' + this._.classify(this.userName).toLowerCase() + '.' + this._.classify(this.appName).toLowerCase()
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
          { appName: this._.underscored(this.appName),
            userName: this.userName,
            userEmail: this.userMail }
          );
          this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            { appName: this._.classify(this.appName),
              userName: this.userName,
              userEmail: this.userMail }
            );

            this.fs.copyTpl(
              this.templatePath('_en.json'),
              this.destinationPath('app/languages/en.json'),
              { ngModulName: this._.classify(this.appName) }
            );

            this.fs.copyTpl(
              this.templatePath('_config.xml'),
              this.destinationPath('config.xml'),
              { appName: this.appName,
                userName: this.userName,
                userEmail: this.userMail,
                widgetId: this.appId }
              );

              this.fs.copyTpl(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('gulpfile.js'),
                { ngModulName: this._.classify(this.appName) }
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

              this.mkdir('app/icons');
              this.mkdir('app/images');
              this.mkdir('resources');

              this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('app/index.html'),
                { title: this.appName, ngModulName: this._.classify(this.appName)  }
              );

              this.fs.copyTpl(
                this.templatePath('home.html'),
                this.destinationPath('app/templates/views/home.html'),
                { title: this.appName }
              );

              // controllers
              this.fs.copyTpl(
                this.templatePath('scripts/controllers/translateController.js'),
                this.destinationPath('app/scripts/controllers/translateController.js'),
                { ngModulName: this._.classify(this.appName) }
              );


              this.fs.copyTpl(
                this.templatePath('scripts/controllers/homeController.js'),
                this.destinationPath('app/scripts/controllers/homeController.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              this.fs.copyTpl(
                this.templatePath('scripts/controllers/mainController.js'),
                this.destinationPath('app/scripts/controllers/mainController.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              this.fs.copyTpl(
                this.templatePath('scripts/controllers/settingsController.js'),
                this.destinationPath('app/scripts/controllers/settingsController.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              // services
              this.fs.copyTpl(
                this.templatePath('scripts/services/ExampleService.js'),
                this.destinationPath('app/scripts/services/ExampleService.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              this.fs.copyTpl(
                this.templatePath('scripts/services/ApiService.js'),
                this.destinationPath('app/scripts/services/ApiService.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              // config
              this.fs.copyTpl(
                this.templatePath('scripts/config/app.config.js'),
                this.destinationPath('app/scripts/config/'+ this._.classify(this.appname).toLowerCase() +'.config.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              // translate
              this.fs.copyTpl(
                this.templatePath('scripts/translate/app.translate.js'),
                this.destinationPath('app/scripts/translate/'+ this._.classify(this.appname).toLowerCase() +'.translate.js'),
                { ngModulName: this._.classify(this.appName) }
              );


              // routes
              this.fs.copyTpl(
                this.templatePath('scripts/routes/app.routes.js'),
                this.destinationPath('app/scripts/routes/'+ this._.classify(this.appname).toLowerCase() +'.routes.js'),
                { ngModulName: this._.classify(this.appName) }
              );


              // utils
              this.fs.copyTpl(
                this.templatePath('scripts/utils/lodash.js'),
                this.destinationPath('app/scripts/utils/lodash.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              // app

              this.fs.copyTpl(
                this.templatePath('scripts/app.js'),
                this.destinationPath('app/scripts/app.js'),
                { ngModulName: this._.classify(this.appName) }
              );

              this.fs.copy(
                this.templatePath('_vendor.json'),
                this.destinationPath('vendor.json')
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
      })();
