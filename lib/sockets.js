var io = require('socket.io')();
var r = require('rethinkdb');
var dbConfig = require('config').get('dbConfig');

module.exports = (connection) => {
  io.use(function(socket, next){
    socket.position = {
      lat: socket.handshake.query.lat,
      lng: socket.handshake.query.lng
    }
    socket.range = 5;
    next();
  });

  io.on('connection', (socket) => {
    socket.on("change-range", (range) => {
      socket.range = range;
    });

    r.db(dbConfig.dbName)
      .table(dbConfig.tableName)
      .changes()
      .filter(
        r.circle([parseFloat(socket.position.lat),
          parseFloat(socket.position.lng)], socket.range, {unit: 'km'})
         .intersects(r.row('new_val')(dbConfig.indexName)))
      .run(connection, (err, cursor) => {
        if (cursor) {
          cursor.each((err, row) => {
            if (row) {
              socket.emit('new_boards', row.new_val);
            }
          });
        }
    });
  });
  return io;
};
