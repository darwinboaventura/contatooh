var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
	passport.use(new GitHubStrategy({
		clientID: 'dfb777c46b5d717b8a42',
		clientSecret: '6a44741b723a6518846a36bce8016851c8214df7',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){
		Usuario.findOrCreate({"login": profile.username}, {"nome": profile.username}, function(erro, usuario) {
			if (erro) {
				console.log(erro);
				return done(erro);
			}

			return done(null, usuario);
		});
	}));

	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec().then(function(usuario) {
			done(null, usuario);
		});
	});
};