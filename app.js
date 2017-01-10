var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

//01. Connection to Database
var mongoUrl = "mongodb://triton:12345@ds029735.mlab.com:29735/heroku_gsdtxvgc";
mongoose.connect(mongoUrl);
var db = mongoose.connection;

//02. Routes
var index = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/users');

//03. Inicio de la aplicación
var app = express();

//04. View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//05. BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//06. Static folder
app.use(express.static(path.join(__dirname, 'public')));

//07. Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//08. Passport init
app.use(passport.initialize());
app.use(passport.session());

//09. Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//10. Connect Flash
app.use(flash());

//11. Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//12. Using the routes
app.use('/', index);
app.use('/users', users);
// app.use('/api', api);

//13. Set Port
app.set('port', (process.env.PORT || 3000));

//14. Fire App
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});