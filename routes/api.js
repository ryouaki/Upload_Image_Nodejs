var express = require('express');
var apiRoute = express();

apiRoute.use('/', function(req, res, next) {
  if (req.session == undefined) {
    res.stats(401).json({
      error : '401'
    });
  } else {
    next();
  }
});

apiRoute.use('login', function(req, res, next) {
  res.json({
    info : req.session.sessionID
  });
});

module.exports = apiRoute;