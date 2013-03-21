/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , mongodb = require('mongodb')
  , path = require('path');

var app = express();
var Server = mongodb.Server;
var Db = mongodb.Db;

//var server = new Server('ds1234.mongolab.com', 12345, {auto_reconnect : true});
//var db = new Db('db-name', server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.post('/upload', function(req, res){
  console.log(req.body);
  res.send("ok");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
