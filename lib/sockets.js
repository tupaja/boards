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
    r.db(dbConfig.dbName)
      .table(dbConfig.tableName)
      .changes()
      .filter(
        r.circle([parseFloat(socket.position.lat),
          parseFloat(socket.position.lng)], 100, {unit: 'km'})
         .intersects(r.row('new_val')(dbConfig.indexName)))
      .run(connection, (err, cursor) => {
        if (cursor) {
          cursor.each((err, row) => {
            if (row) {
              socket.emit('changes', row.new_val);
            }
          });
        }
    });
  });
  return io;
};
