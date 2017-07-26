const passport = require('passport');
const mongoose = require('mongoose');
const BearerStrategy = require('passport-http-bearer').Strategy;
const AuthService = require('../services/v1/auth');

const User = mongoose.model('User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new BearerStrategy((token, done) => {
  AuthService.authorize(token)
    .then(user => done(null, user, { scope: 'all' }))
    .catch(done);
}));

module.exports = passport;
