var express = require('express')
  , adminRoute = express()
  , messages = require('../message/message')
  , utils = require('../common/utils')
  ;

adminRoute.use('/',function(req,res,next){
	if(req.session.user_flg != true && req.path != "/login") {
		res.render('admin/index',{title:messages.admin.title,message:""});
	}else{
		next();
	}
});

adminRoute.post('/login',function(req,res,next){
	var user = req.body;
	global.db.collection("user").findOne({"user_name":user.name,"user_pw":user.pass},function(err,data){
		if(data==undefined||data==null) {
			res.render('admin/index',{title:messages.admin.title,message:messages.admin.login_failed});
		}else{
			req.session.user_flg=true;
			res.render('admin/main',{title:messages.admin.title});
		}
	});
});

adminRoute.get('/main',function(req,res,next){
	res.status(200).json({main:"message"});
});

adminRoute.get('/product',function(req,res,next){
	res.render('admin/main',{title:messages.admin.title});
});

adminRoute.get('/user',function(req,res,next){
	res.render('admin/main',{title:messages.admin.title});
});

adminRoute.get('/system',function(req,res,next){
	res.render('admin/main',{title:messages.admin.title});
});

module.exports = adminRoute;