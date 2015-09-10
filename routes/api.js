var express = require('express');
var router = express.Router();

router.route("/boards").get(function (req, res) {
  res.json([
    {title: "Hello world 1", content: "Lorem ipsum Sit adipisicing reprehenderit 1."},
    {title: "Hello world 2", content: "Lorem ipsum Sit adipisicing reprehenderit 2."},
    {title: "Hello world 3", content: "Lorem ipsum Sit adipisicing reprehenderit 3."},
    {title: "Hello world 4", content: "Lorem ipsum Sit adipisicing reprehenderit 4."},
  ]);
});

module.exports = router;
