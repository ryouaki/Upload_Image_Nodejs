
/**
 * Module dependencies.
 */

var express = require('express')
  , admin = require('./routes/admin')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session)
  , dbConfig = require('./database/dbConfig').dbConfig
  , MongoClient = require('mongodb').MongoClient
  , message = require('./message/message');

var app = express();
var db  = null;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: dbConfig.discription,
    store: new MongoStore({
        db: dbConfig.name,
    })
}));

app.use('/',function(req,res,next){
	console.log('app /');
	next();
});

app.get('/',function(req,res,next){
	res.render('index',{title:message.index.title});
});

app.use('/admin',admin);
app.use('/api',api);

MongoClient.connect("mongodb://"+dbConfig.host+":"+dbConfig.port+"/"+dbConfig.name, function(err, database) {
	  if(err) throw err;

	  db = database;

	  // Start the application after the database connection is ready
	  http.createServer(app).listen(app.get('port'), function(){
		  console.log('Express server listening on port ' + app.get('port'));
	  });
});

