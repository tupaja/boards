var passport = require("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('config');

var facebookOAuth = config.get("facebookOAuth");
facebookOAuth.enableProof = false;

passport.use(new FacebookStrategy(facebookOAuth,
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
