/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

var databaseUrl = process.env.MONGODBURL || "mongodb://username:password@server:45087/MeterLog";
var collections = ["logdata"];
var db = require("mongojs").connect(databaseUrl, collections);

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
	//console.log(req.body);
	
	db.logdata.save(req.body, function(err, saved) {
		if( err || !saved ) {
			console.log("Userdata not saved: "+err);
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.write("something went wrong");
			res.end();
		} else {
			console.log("Userdata saved");
			res.writeHead(200);
			res.write("OK");
			res.end();
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
