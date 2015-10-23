var express = require('express');
var apiRoute = express();

apiRoute.use('/',function(req,res,next){
	console.log('api /');
	res.send('Api');
});

module.exports = apiRoute;