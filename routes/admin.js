var express = require('express');
var adminRoute = express();

adminRoute.use('/',function(req,res,next){
	console.log('admin /');
	res.send('Admin');
});

module.exports = adminRoute;