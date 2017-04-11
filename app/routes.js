// Backend routes
var express = require('express');
var router = express.Router();

var user = require('./models/user.js');

//Server routes
//Handling of API calls and authentication

router.get('*', function(req,res){
  res.render('home', {title: "Injenia"});
});

module.exports = router;
