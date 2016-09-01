'use strict'

const user = require('../model/user');
const rooms = require('../model/room');

module.exports = function(io) {
  io.on('connection', (socket) => {
    // console.log("Query: ", socket.handshake.data);
    // socket.join('Test');

    socket.on('question', (channelID) => {
      socket.broadcast.to(channelID).emit('new bc message', msg);
    });

    socket.on('authorization', (userData) => {
      console.log('AUTH');
      console.log(userData);
      console.log(user);
      user[userData.name] = userData;
      console.log('AFTER');
      console.log(user);
    });

    socket.on('create room', (room) => {
      console.log('create room');
      console.log(room);
      rooms.push({
        name: room,
        players: [],
      });
      socket.broadcast.emit('new room', rooms);
      // socket.emit('new room', rooms);
    });

    socket.on('join room', (channelID, user) => {

      socket.join(channelID);
      // socket.broadcast.emit('player join' )
    });
    socket.on('leave room', (channelID, user) => {

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
