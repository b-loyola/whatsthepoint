const server = require('./server');
const io = require('socket.io')(server);

let locations = {};

const locationTtl = 30 * 1000 // 30 sec in ms

io.on('connection', (socket) => {
  io.emit('messages', locations);
  socket.on('message', (locationData) => {
    locationData['lastUpdate'] = new Date();
    locations[socket.id] = locationData;
    io.emit('messages', locations);
  });
});

setInterval(() => {
  Object.keys(locations).forEach((key) => {
    if (((new Date()) - locations[key].lastUpdate) > locationTtl) {
      delete locations[key];
    }
  });
}, 1000);

let port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('Server running on port ' + port);
});
