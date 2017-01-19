// config/express.js
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
	var app = express();
	var load = require('express-load');

	// variável de ambiente
	app.set('port', 3000);
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({type:'application/vnd.api+json'}));
	app.use(require('method-override')());
	app.use(cookieParser());
	app.use(session({
		secret: 'homem avestruz',
		resave: true,
		saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session())

	// middleware
	app.use(express.static('./public'));

	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};