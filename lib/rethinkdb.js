var async = require('async');
var r = require('rethinkdb');
var dbConfig = require('config').get('dbConfig');

var connect = function(callback) {
  r.connect({ host: dbConfig.host, port: dbConfig.port }, callback);
};

var createDb = function(connection, callback) {
  var prepareDb = function(callback) {
    r.dbCreate(dbConfig.dbName).run(connection, function (err) {
      callback(err, connection);
    });
  }

  var prepareTable = function(connection, callback) {
    r.db(dbConfig.dbName)
      .tableCreate(dbConfig.tableName)
      .run(connection, function (err) {
        callback(err, connection);
      });
  }

  var prepareIndex = function(connection, callback) {
    r.db(dbConfig.dbName)
      .table(dbConfig.tableName)
      .indexCreate(dbConfig.indexName, { geo: true })
      .run(connection, function (err) {
        callback(err, connection);
      });
  }

  var waitForIndex = function(connection, callback) {
    r.db(dbConfig.dbName)
      .table(dbConfig.tableName)
      .indexWait(dbConfig.indexName)
      .run(connection, function(err, result) {
        callback(err, connection);
      });
  }

  r.db(dbConfig.dbName)
    .table(dbConfig.tableName)
    .indexWait(dbConfig.indexName)
    .run(connection, function(err, result) {
      if (err) {
        async.waterfall([
          prepareDb,
          prepareTable,
          prepareIndex,
          waitForIndex
        ], function (err, result) {
          callback(err, connection);
        })
      } else callback(err, connection);
  });
};

module.exports = async.seq(connect, createDb);
