var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('config');
var r = require('rethinkdb');
var _ = require('lodash');

var router = express.Router();

router.route('/boards').get(function (req, res) {
  r.db(config.get('dbConfig').dbName)
    .table(config.get('dbConfig').tableName)
    .getNearest(r.point(parseInt(req.query.lat), parseInt(req.query.lng)),
      { index: config.get('dbConfig').indexName, maxDist: 1000 })
    .orderBy(r.desc('created_at'))
    .limit(10)
    .run(req.app.connection, function (err, cursor) {
      if (!err) {
        cursor.toArray(function (err, result) {
          if (!err) {
            res.json(_.map(result, function (board) {
              return board.doc;
            }));
          }
        });
      }
    });
});

router.route('/me').get(function (req, res) {
  jwt.verify(req.cookies.token, config.get('jwtSecret'), function(err, decoded) {
    if (err) { res.json({ auth: false }); }
    else { decoded.auth = true; res.json(decoded); }
  });
});

module.exports = router;
