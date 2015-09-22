var express = require('express');
var passport = require("passport");
var router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook', { session: false }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
