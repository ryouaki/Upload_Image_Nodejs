var express = require('express');
var adminRoute = express();

adminRoute.use('/',function(req,res,next){
	console.log('admin /');
	res.render('admin/index',{title:"admin"});
	//res.send('Admin');
});

module.exports = adminRoute;