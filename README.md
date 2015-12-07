# ![ScreenShot](https://github.com/reedia/generator-avionic/raw/master/Masthead.png)
###### Propelling World-class Cross-platform Hybrid Applications ✈

[![NPM](https://nodei.co/npm/generator-avionic.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/generator-avionic/)

[![npm version](https://badge.fury.io/js/generator-avionic.svg)](https://badge.fury.io/js/generator-avionic)
[![Build Status](https://travis-ci.org/reedia/generator-avionic.svg?branch=master)](https://travis-ci.org/reedia/generator-avionic) 
[![Dependency Status](https://david-dm.org/reedia/generator-avionic.svg)](https://david-dm.org/reedia/generator-avionic)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/reedia/generator-avionic)

## Table of Contents

* [Elevator Pitch](#elevator-pitch)
* [Say Whaaat](#say-whaaat)
* [Getting Started](#getting-started)
* [Project setup](#project-setup)
* [Running on Windows](#running-on-windows)
* [Workflow](#workflow)
* [What has been generated?](#what-has-been-generated?)
* [Talk to us](#talk-to-us)
* [Want to contribute?](#want-to-contribute?)
* [Our fleet](#our-fleet)
* [Our Values](#our-values)
* [History](#history)
* [License](#license)

## Elevator Pitch
A [Yeoman](http://yeoman.io) generator using [AngularJS](https://angularjs.org/), [Express](http://expressjs.com/), [ngCordova](http://ngcordova.com/), [Gulp](http://gulpjs.com/) and [Bower](http://bower.io/) that helps you kickstart highly sophisticated [Ionic](http://ionicframework.com/) projects to evolve and upgrade every aspect of your development to the next moonshot.

## Say Whaaat
[AVIONIC ✈](http://avionic.io) is an incredibly simple mobile app creation tool for Android and iOS.

## Getting Started

[![asciicast](https://asciinema.org/a/30440.png)](https://asciinema.org/a/30440)

### Features

[AVIONIC ✈](http://avionic.io) takes care of providing everything needed to get started.

* Gulp jobs for development, building, emulating and running your app
* Compiles and concatenates your Sass
* Local development server with live reload, even inside ios emulator
* Automatically inject all your JS sources into `index.html`
* Auto min-safe all Angular DI through `ng-annotate`, no need to use weird bracket notation
* Comes already with [ng-cordova](http://ngcordova.com/) and [lodash](https://lodash.com) included
* generate icon font from svg files
* Blazing fast


## Project setup, installation, and configuration

### Project setup

#### Using Parse to provide a backend for the app

+ To start, you should first create an account on parse.com.

+ Once logged in, access the Dashboard where you should be able to create a new app.

+ Create a brand new app called ```Avionic```.

+ After creating the app, you will see in ```settings/keys``` your app IDs and keys. These will be used later in the Avionic app configuration.

+ Go to ```Core\Data```

+ Import the ```Avionic.json``` file

+ That's it!

### Installation

#### Installing the generator-avionic

Export the repo to your local computer

You should have Yeoman installed globally

```bash
npm install -g yo
```

To install generator-avionic from npm, run:

```bash
npm i generator-avionic
```

Finally, initiate the generator:

```bash
yo avionic
```

after installation, edit:
```bash
Edit app/templates/scripts/config/app.config.js to set your application API keys. (FACEBOOK_ID,GOOGLE_ID,TWITTER_ID,TWITTER_SECRET and Parse APP_ID and REST_API_KEY)
```

Then, just run:
```bash
gulp
```
to start up the build job and file watchers.

In order to compile Sass, you need to have ruby and the sass ruby gem installed: `gem install sass`.

## Running on Windows

The generator should work just like on unix/mac. 

You will need Ruby and SASS installed.

1 - Download the ruby [installer](http://rubyinstaller.org/downloads/) 
2 - Click install and select the option to create environment variables
3 - Open cmd and download the gem of the SASS, typing: gem install sass

```
We are looking for contributors to help us test and optimise the AVIONIC ✈ for Windows.
```

## Workflow

This doc assumes you have `gulp` globally installed (`npm install -g gulp`).
If you do not have / want gulp globally installed, you can run `npm run gulp` instead.

#### Development mode

By running just `gulp`, we start our development build process, consisting of:

- compiling, concatenating, auto-prefixing of all `.scss` files required by `app/styles/main.scss`
- creating `vendor.js` file from external sources defined in `./vendor.json`
- linting all `*.js` files `app/scripts`, see `.jshintrc` for ruleset
- minifying all images files located within the `app/images/` directory
- automatically generate licenses, readme and all necessary documents
- automatically inject sources into `index.html` so we don't have to add / remove sources manually
- build everything into `.tmp` folder (also gitignored)
- start local development server and serve from `.tmp`
- start watchers to automatically lint javascript source files, compile scss and reload browser on changes


## What has been generated?

The folder includes an [AVIONIC ✈](http://avionic.io) basic application and backend server as a starting point.

```
AVIONIC/
├── app/
    └── index.html
    └── favicon.ico
    └── README.md
    ├── fonts/
    ├── icons/
    ├── images/
    ├── languages/
    ├── scripts/
    ├── styles/
    ├── templates/           # This contains the app template
├── bower_components/
├── helpers/
├── hooks/
├── node_modules/
├── resources/
├── server/
├── www
├── gulpfile.js
├── bower.json
├── package.json
├── vendor.json
├── config.xml

```

### AVIONIC ✈ CLI scripts

The [AVIONIC ✈](http://avionic.io) command lines scripts make it easy to start, build, run, and emulate your AVIONIC ✈ app. In addition, it comes with a complete set of scripts to execute all the necessary scripts to build your app on iOS or Android.

#### 1) Step by Step Scripts

##### For iOS
  + [x] Execute build - **gulp av:build**
  + [x] Add iOS platform to Cordova - **gulp av:ios**
  + [x] Prepare resources (app icon and splash screen) - **gulp av:resources** 
  + [x] Prepare app icon - **gulp av:icon**
  + [x] Prepare splash screen - **gulp av:splash**  
  + [x] Serve app to default system browser - **gulp av:serve**
  + [x] Emulate app - **gulp av:emulate**    


##### For Android
  + [x] Execute build - **gulp av:build**
  + [x] Add Android platform to Cordova - **gulp av:android**
  + [x] Prepare resources (app icon and splash screen) - **gulp av:resources** 
  + [x] Prepare app icon - **gulp av:icon**
  + [x] Prepare splash screen - **gulp av:splash**    
  + [x] Serve app to default system browser - **gulp av:serve**
  + [x] Emulate app - **gulp av:emulate**

#### 2) All-In-One Scripts

##### gulp avionic:ios
Run application in an iOS device attached
 
 + Execute build
 + Add iOS platform to Cordova
 + Prepare resources (app icon and splash screen)
 + Run app on attached iOS device

#### gulp avionic:android

Run application in an Android device attached

 + Execute build
 + Add Android platform to Cordova
 + Prepare resources (app icon and splash screen)
 + Run app on attached Android device
  
#### Splash screens and Icons

Replace `splash.png` and `icon.png` inside `/resources`. Then run **gulp av:resources** . If you only want to regenerate icons or splashs, you can run **gulp av:icon** or **gulp av:splash** shorthand.

## Talk to us

[![Gitter](https://badges.gitter.im/reedia/generator-avionic.svg)](https://gitter.im/reedia/generator-avionic?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Our fleet

[AVIONIC ✈](http://avionic.io) is beautifully crafted by these people and a bunch of awesome [contributors](https://github.com/reedia/generator-avionic/graphs/contributors)

[![Sebastien Rousseau](https://avatars0.githubusercontent.com/u/1394998?s=117)](http://sebastienrousseau.com) |
|:---:
[Sebastien Rousseau](https://github.com/sebastienrousseau) |

Credit also to [Thomas Maximini](http://thomasmaximini.com) for the work and inspiration surrounding the [generator-ionic-gulp](https://github.com/tmaximini/generator-ionic-gulp).


## Want to contribute?

* Please read carefully our [Contributor License Agreement (CLA)](CONTRIBUTING.md)

## Our Values
1. We believe perfection must consider everything.
2. We take our passion beyond Code into our daily practices.
3. We are just obsessed about creating and delivering exceptional solutions.

## History

* See [Avionic ✈ Release](https://github.com/reedia/generator-avionic/releases) list.

## License

* [MIT License](http://reedia.mit-license.org/) Copyright © Reedia Limited 2015. All rights reserved.
