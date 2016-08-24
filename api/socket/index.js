'use strict'

const user = {};
const rooms = [];

module.exports = function(io) {
  io.on('connection', (socket) => {
    // console.log("Query: ", socket.handshake.data);
    // socket.join('Test');

    socket.on('question', (channelID) => {
      socket.broadcast.to(channelID).emit('new bc message', msg);
    });

    socket.on('authorization', (userData) => {
      user[userData.name] = userData;
    });

    socket.on('create channel', (channel) => {
      console.log('create channel');
      console.log(channel);
      rooms.push(channel);
      socket.broadcast.emit('new channel', channel);
    });

    socket.on('join room', (channelID) => {
      socket.join(channelID);
    });
    socket.on('set store', (data) => {
      user.data = data;
    });
    socket.on('get store', () => {
      console.log(user);
      socket.emit('data', user);
    });

    socket.on('join channel', (channel) => {
      socket.join(channel.name);
    });

    // socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      // data.id = messageIndex;
      // messageBuffer[messageIndex % bufferSize] = data;
      // messageIndex++;
      socket.emit('msg', data);
    });
    socket.on('disconnect', function() {
      delete user[socket.id];
    });
  });
}
