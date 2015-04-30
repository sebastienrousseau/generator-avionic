(function() {
  'use strict';
  /**
  * @ngdoc server
  * @name Avionic ✈ Server
  * @description
  * # Avionic ✈ Server
  */

  // Avionic ✈ Server generates a new instance of an express server.
  var express = require('express'),
      http = require('http'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
  // workouts = require('./routes/workouts'),

  app = express();

  // Avionic ✈ Server CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests and more.
  app.use(function(req,res,next) {
    res.header('Charset','utf8');
    res.setHeader('X-Powered-By', 'Avionic');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    next();
});

// Pull information from html in POST
  app.use(bodyParser());

  // Simulate DELETE and PUT
  app.use(methodOverride());

  app.use(express.static('../.tmp'));

  // Avionic ✈ ServerJSON Services
  // app.get('/workouts', workouts.findAll);
  // app.get('/workouts/:id', workouts.findById);

  //  Avionic ✈ Server
  app.set('host', process.env.HOST || '127.0.0.1');
  app.set('port', process.env.PORT || 5000);
  var server = http.createServer(app).listen(app.get('port'),app.get('host'), function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Avionic ✈ Server listening at http://%s:%s', host, port);
  });
})();
