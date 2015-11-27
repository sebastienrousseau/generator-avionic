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
*
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
  'use strict'
  /**
  * @ngdoc server
  * @name Avionic ✈ Server
  * @description
  * # Avionic ✈ Server
  */

  // Avionic ✈ Server generates a new instance of an express server.
  var express = require('express')
  var http = require('http')
  var bodyParser = require('body-parser')
  var methodOverride = require('method-override')
  var compression = require('compression')
  app.use(compression())
  var app = express()

  // Avionic ✈ Server CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests and more.
  app.use(function (req, res, next) {
    res.header('Charset', 'utf8')
    res.setHeader('X-Powered-By', 'Avionic')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')

    next()
  })

  // Pull information from html in POST
  app.use(bodyParser())

  // Simulate DELETE and PUT
  app.use(methodOverride())

  app.use(express.static('../.tmp'))

  // Avionic ✈ ServerJSON Services
  // app.get('/workouts', workouts.findAll)
  // app.get('/workouts/:id', workouts.findById)

  //  Avionic ✈ Server
  app.set('host', process.env.HOST || '127.0.0.1')
  app.set('port', process.env.PORT || 5000)
  var server = http.createServer(app).listen(app.get('port'), app.get('host'), function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Avionic ✈ Server listening at http://%s:%s', host, port)
  })
})()
