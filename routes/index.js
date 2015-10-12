var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.locals.config = require('config').get("client");
  res.render('index');
});

module.exports = router;
