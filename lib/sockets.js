var io = require('socket.io')();
var r = require('rethinkdb');
var dbConfig = require('config').get('dbConfig');

module.exports = (connection) => {
  io.use(function(socket, next){
    socket.position = {
      lat: socket.handshake.query.lat,
      lng: socket.handshake.query.lng
    }
    next();
  });

  io.on('connection', (socket) => {
    function setListener(range) {
      if (socket.cursor) { socket.cursor.close(); }
      r.db(dbConfig.dbName)
        .table(dbConfig.tableName)
        .changes()
        .filter(
          r.circle([parseFloat(socket.position.lat),
            parseFloat(socket.position.lng)], parseInt(range), {unit: 'km'})
           .intersects(r.row('new_val')(dbConfig.indexName)))
        .run(connection, (err, cursor) => {
          if (cursor) {
            socket.cursor = cursor;
            cursor.each((err, row) => {
              if (row) {
                socket.emit('new_boards', row.new_val);
              }
            });
          }
      });
    }

    setListener(5);

    socket.on("change-range", (range) => {
      setListener(range);
    });

    socket.on('disconnect', function() {
      if (socket.cursor) { socket.cursor.close(); }
    });
  });
  return io;
};
