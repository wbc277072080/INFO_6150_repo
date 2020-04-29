'use strict'
const passport=require('passport'), LocalStrategy = require('passport-local').Strategy,
mongoose=require('mongoose');
let User=mongoose.model('Users');
passport.use(new LocalStrategy({ usernameField: 'email' },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
