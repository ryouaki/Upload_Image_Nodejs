var express = require('express')
  , adminRoute = express()
  , messages = require('../message/message')
  , fs=require("fs")
  , utils = require('../common/utils');

adminRoute.use('/', function(req, res, next) {
  if (req.session.user_flg != true && req.path != "/login") {
    if(req.path == "/")
      res.render('admin/index', {title : messages.admin.title, message : "" });
    else
      res.json({error:"session_failed"});
  } else {
    console.log(req.body);
    next();
  }
});

adminRoute.get("/", function(req, res, next) {
  res.render('admin/main', {
    title : messages.admin.title
  });
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

adminRoute.post('/product', function(req, res, next) {
  var param = {};
  var page  = 0;
  var max   = 2;
  if(req.body.param!=undefined)
    param = req.body.param;
  if(req.body!=undefined)
    page = req.body.page;
  param.delete_flg = false;
  global.db.collection("product").find(param).sort({"year":-1}).skip(page*max).limit(max+1).toArray().then(function(data){
    var isLast = false;
    var isFirst = false;
    
    if(page==0)
      isFirst = true;

    if(data.length>max){
      data.splice(2,1);
    }else{
      isLast = true;
    }
    
    res.status(200).json({data:data, first:isFirst, last:isLast});
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

adminRoute.post('/updateImage',function(req, res, next){
  var imgData = req.body.imgData;
  if(imgData.length<=0){
    res.json({error:"Update failed!"});
    res.end();
  }
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var filename = "/public/upload/"+utils.logDataTime()+".jpeg";
  fs.writeFile("."+filename,dataBuffer,function(err){
    if(err){
      console.log(err);
      res.json({error:"Update failed!"});
      res.end();
    }else{
      res.json({path:filename});
      res.end();
    }
  });
});

adminRoute.post('/delProduct',function(req, res, next){
  var data = req.body;
  if(data==undefined){
    res.json({error:"insert failed"});
    res.end();
  }
  console.log(data.delList);
  var collection = global.db.collection("product");
  data.delList.forEach(function(item){
    console.log(item);
//    collection.findAndRemove({b:1}, [['_id', 1]], function(err, doc) {
//      test.equal(null, err);
//      test.equal(1, doc.value.b);
//      test.equal(1, doc.value.d);
//    });
  });
});

module.exports = adminRoute;