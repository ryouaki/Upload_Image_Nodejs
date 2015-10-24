var express = require('express');
var apiRoute = express();

apiRoute.use('/',function(req,res,next){
	console.log('api /');
	res.render('api/index',{title:"api"});
	res.send('Api');
});

module.exports = apiRoute;