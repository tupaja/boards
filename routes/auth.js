var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('config');
var router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook', { session: false }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
  function(req, res) {
    res.cookie("token",
      jwt.sign({ email: req.user.emails[0].value }, config.get("jwtSecret")),
      { httpOnly: true });
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
