
/**
 * Module dependencies.
 */

var express = require('express')
  , admin = require('./routes/admin')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , utils = require('./common/utils')
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session)
  , dbConfig = require('./database/dbConfig').dbConfig
  , MongoClient = require('mongodb').MongoClient
  , message = require('./message/message')
  , bodyParser = require('body-parser')
  ;

var app = express();
var db  = null;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: utils.secret(),
    store: new MongoStore({
        db: dbConfig.name,
        host: dbConfig.host,
        port: dbConfig.port,
        ttl:1*24*60*60,
    })
}));

app.use('/',function(req,res,next){
	next();
});

app.get('/',function(req,res,next){
	res.render('index',{title:message.index.title});
});

app.use('/admin',admin);
app.use('/api',api);

MongoClient.connect("mongodb://"+dbConfig.host+":"+dbConfig.port+"/"+dbConfig.name, function(err, database) {
	
	if(err) {
		utils.ERR('Database connect failed ! ');
		return
	}

	db = database;
	
	global.db = db;

	// Start the application after the database connection is ready
	http.createServer(app).listen(app.get('port'), function(){
	  utils.LOG('Express server listening on port ' + app.get('port'));
	});
});

