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
  var yosay = require('yosay');
  var chalk = require('chalk');
  var path = require('path');
  var prompts = require('../prompts.json');
  var color = require('../utils/color.js');


module.exports = function(AvionicGenerator) {

  /**
   * Ask all questions from prompts.json
   * Complete responses with templated answers
   */
  AvionicGenerator.prototype.askForColor = function askForColor() {
    var done = this.async();
      this.prompt(color.prompts, function (props) {
        this.appColor = props.color;
        done();
console.log(this.appColor);
        if (typeof this.appColor  !== 'undefined' && this.appColor.length > 0) {
          this.appColor = props.color;
        }
        else {
          this.appColor = '#000000';
          console.log(chalk.cyan('No color scheme selected. Defaulting to the Avionic theme'));
        }

      }.bind(this));
  };
};
}());
