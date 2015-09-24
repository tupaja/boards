var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('config');
var router = express.Router();

router.route("/boards").get(function (req, res) {
  require('sleep').sleep(1); // simulate latency
  res.json([
    {title: "Hello world 1", content: "Lorem ipsum Sit adipisicing reprehenderit 1."},
    {title: "Hello world 2", content: "Lorem ipsum Sit adipisicing reprehenderit 2."},
    {title: "Hello world 3", content: "Lorem ipsum Sit adipisicing reprehenderit 3."},
    {title: "Hello world 4", content: "Lorem ipsum Sit adipisicing reprehenderit 4."},
  ]);
});

router.route("/me").get(function (req, res) {
  jwt.verify(req.cookies.token, config.get("jwtSecret"), function(err, decoded) {
    if (err) { res.status(401); }
    else { res.json(decoded); }
  });
});

module.exports = router;
