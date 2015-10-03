var express = require('express');
var jwt = require('jsonwebtoken');
var authentication = require('../lib/authentication');
var config = require('config');
var r = require('rethinkdb');
var _ = require('lodash');
var moment = require('moment');

var router = express.Router();

router.route('/boards').get(function (req, res) {
  r.db(config.get('dbConfig').dbName)
    .table(config.get('dbConfig').tableName)
    .getIntersecting(
      r.circle(r.point(parseFloat(req.query.lat), parseFloat(req.query.lng)),
        100, { unit: "km" }), { index: config.get('dbConfig').indexName })
    .orderBy(r.desc('created_at'))
    .limit(10)
    .run(req.app.connection, function (err, cursor) {
      if (!err) {
        cursor.toArray(function (err, result) {
          if (!err) {
            res.json(result);
          }
        });
      }
    });
})
.post(authentication, function (req, res) {
  r.db(config.get('dbConfig').dbName)
    .table(config.get('dbConfig').tableName)
    .insert(_.merge(_.pick(req.body.board, ["title", "content"]), {
      created_at: moment().format(),
      location: r.point(
        parseFloat(req.body.board.lat), parseFloat(req.body.board.lng))
    }), { returnChanges: true })
    .run(req.app.connection, function (err, result) {
      if(!err) {
        res.json(result.changes[0].new_val);
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
