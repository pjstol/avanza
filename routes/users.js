var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

// Register
router.get('/signup', function(req, res){
	res.render('signup', {title: "Registrar Nuevo Usuario"});
});

// Login
router.get('/login', function(req, res){
	res.render('login', {title: "Login para Avanza!"});
});

// Render User Dashboard
router.get('/dashboard', function(req, res){
	res.render('dashboard', {title: "Dashboard del usuario"});
});

// Register User
router.post('/signup', function(req, res){

	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var name = req.body.name;
	var lastname = req.body.lastname;
	var address = req.body.address;
	var phone = req.body.phone;
	var address = req.body.address;
	var empresa = req.body.empresa;
	var website = req.body.website;

	// Validation

	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('signup',{
			errors:errors
		});
	} else {
		var newUser = new User({
			username: username,
			email:email,
			password: password,
			profile: {
				name: name,
				lastname: lastname,
				phone: phone,
				company: empresa,
				address: address,
				website: website
			}
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Registro Exitoso!! Ahora te puedes loggear');
		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'El usuario '+username+' no existe en nuestra base de datos, favor contactanos'});
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Password incorrecto, por favor intenta nuevamente o comunicate con nosotros'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/dashboard', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;
