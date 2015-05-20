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
  var yosay = require('yosay');
  var chalk = require('chalk');

  var prompts = require('./prompts.json');

  // Avionic ✈ ASCII Text Logo
  var logo =
  "\n" +
  chalk.cyan.bold("\n               ___ _    __________  _   ____________") +
  chalk.cyan.bold("\n              /   | |  / /  _/ __ \\/ | / /  _/ ____/") +
  chalk.cyan.bold("\n             / /| | | / // // / / /  |/ // // /     ") +
  chalk.cyan.bold("\n            / ___ | |/ // // /_/ / /|  // // /___   ") +
  chalk.cyan.bold("\n           /_/  |_|___/___/\\____/_/ |_/___/\\____/ ") +
  "\n"+
  chalk.cyan.bold("\n-- ") + chalk.yellow.bold("Propelling World-class Cross-platform Hybrid Applications") + chalk.cyan.bold(" -- ✈");

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

  var plane =
  "\n" +
  chalk.red.bold("                         ___________") +
  chalk.red.bold("\n                              |") +
  chalk.red.bold("\n                         _   _|_   _") +
  chalk.red.bold("\n                        (_)-/ ") + chalk.cyan.bold("✈") + chalk.red.bold(" \\-(_)") +
  chalk.red.bold("\n _                         /\\___/\\                         _") +
  chalk.red.bold("\n(_)_______________________( ( ") + chalk.white.bold("X") + chalk.red.bold(" ) )_______________________(_)") +
  chalk.red.bold("\n                           \\_____/") +
  "\n";

  // var AvionicGenerator = module.exports = yeoman.generators.Base.extend({
  var AvionicGenerator = yeoman.generators.Base.extend ({
    constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.appYear = (new Date()).getFullYear();
    this.appVersion = require('../package.json').version;

    },

    info: function () {
      if (!this.options['skip-welcome-message']) {
          console.log(logo);
          console.log(captain);
          this.log(chalk.white.bold('This is your Captain, welcoming you aboard to Avionic. At this time,\nwe request your full attention as your inflight team will guide you\nthrough the safety features.\n'));
          console.log(crew);
          this.log(chalk.white.bold('All right, it\'s time for final cabin check. Please make sure to\nanswer the questions below. For additional safety information,\ncheck out Avionic.io.\n'));
          console.log(plane);
      }
    }
  });
  require('./src/prompts')(AvionicGenerator);
  require('./src/write')(AvionicGenerator);
  require('./src/files')(AvionicGenerator);
  require('./src/install')(AvionicGenerator);
  module.exports = AvionicGenerator;
}());
