'use strict'

const users = require('../model/user');
const rooms = require('../model/room');
const _ = require('lodash');

module.exports = function(io) {
  io.on('connection', (socket) => {
    // console.log("Query: ", socket.handshake.data);
    // socket.join('Test');

    socket.on('question', (channelID) => {
      socket.broadcast.to(channelID).emit('new bc message', msg);
    });

    // socket.on('authorization', (userData) => {
      // user[userData.name] = userData;
    // });

    socket.on('create room', (room) => {
      rooms.push({
        name: room,
        players: [],
      });
      socket.broadcast.emit('new room', rooms);
      // socket.emit('new room', rooms);
    });

    socket.on('join room', (channelID, userName) => {
      // oooh i need to override code
      const uid = _.findIndex(users, (o) => {
        return o.name === userName;
      });
      const rid = _.findIndex(rooms, (o) => {
        return o.name === channelID;
      });
      if (uid !== -1 && rid !== -1) {
        rooms[rid].players.push(userName);
        users[uid].room = userName;
        socket.join(channelID);
        socket.broadcast.to(channelID).emit('player join room', userName);
      }
      // socket.broadcast.emit('player join' )
    });
    socket.on('leave room', (channelID, user) => {

    });
    // socket.on('set store', (data) => {
    //   users.data = data;
    // });
    socket.on('get store', () => {
      console.log(users);
      socket.emit('data', users);
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
      // delete user[socket.id];
    });
  });
}
