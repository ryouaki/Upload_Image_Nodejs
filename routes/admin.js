var express = require('express')
  , adminRoute = express()
  , messages = require('../message/message')
  , utils = require('../common/utils');

adminRoute.use('/', function(req, res, next) {
  if (req.session.user_flg != true && req.path != "/login") {
    res.render('admin/index', {
      title : messages.admin.title,
      message : ""
    });
  } else {
    next();
  }
});

adminRoute.post('/login', function(req, res, next) {
  var user = req.body;
  global.db.collection("user").findOne({
    "user_name" : user.name,
    "user_pw" : user.pass
  }, function(err, data) {
    if (data == undefined || data == null) {
      res.render('admin/index', {
        title : messages.admin.title,
        message : messages.admin.login_failed
      });
    } else {
      req.session.user_flg = true;
      res.render('admin/main', {
        title : messages.admin.title
      });
    }
  });
});

adminRoute.get('/main', function(req, res, next) {
  global.db.collection("config").find().toArray().then(function(data){
      res.status(200).json({responce : data});
  });
});

adminRoute.get('/product', function(req, res, next) {
  res.render('admin/main', {
    title : messages.admin.title
  });
});

adminRoute.get('/user', function(req, res, next) {
  res.render('admin/main', {
    title : messages.admin.title
  });
});

adminRoute.get('/system', function(req, res, next) {
  res.render('admin/main', {
    title : messages.admin.title
  });
});

adminRoute.get('/logout', function(req, res, next) {
  req.session.user_flg = false
  res.render('admin/index', {
    title : messages.admin.title,
    message : ""
  });
});

adminRoute.post('/updateYears',function(req, res, next){
  var years = req.body.years;
  var reg = /^(\d{4,4})((,{0,1})(\d{4,4}))*$/;
  if(!reg.test(years)){  
    res.json({error:"format invalid!"});
    res.end();
  }else{
    var config = global.db.collection("config");
    config.updateOne({"index":"years"},{"index":"years","value":years},{upsert:true, w: 1});
    res.json(req.body);
  }
});

adminRoute.post('/updateProductionType',function(req, res, next){
  var productiontype = req.body.productiontype;
  if(productiontype==undefined||productiontype.length<=0){  
    res.json({error:"format invalid!"});
    res.end();
  }else{
    var config = global.db.collection("config");
    config.updateOne({"index":"productiontype"},{"index":"productiontype","value":productiontype},{upsert:true, w: 1});
    res.json(req.body);
  }
});

adminRoute.post('/updateBrand',function(req, res, next){
  var brands = req.body.brands;
  if(brands==undefined||brands.length<=0){  
    res.json({error:"format invalid!"});
    res.end();
  }else{
    var config = global.db.collection("config");
    config.updateOne({"index":"brands"},{"index":"brands","value":brands},{upsert:true, w: 1});
    res.json(req.body);
  }
});

module.exports = adminRoute;