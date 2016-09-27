'use strict'

const users = require('../model/user');
const rooms = require('../model/room');
const question = require('../model/question');
const _ = require('lodash');

module.exports = function(io) {
  // socket.id
//   // sending to sender-client only
// socket.emit('message', "this is a test");
//
// // sending to all clients, include sender
// io.emit('message', "this is a test");
//
// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");
//
// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');
//
// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');
//
// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');
//
// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');
//
// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');
  io.on('connection', (socket) => {

    socket.on('question', (channelID) => {
      socket.broadcast.to(channelID).emit('new bc message', msg);
    });

    socket.on('create room', (room) => {
      rooms.createRoom(room);
      socket.broadcast.emit('new room', rooms.getRooms());
    });

    socket.on('join room', (channelID, userName) => {
      // oooh i need to override code
      const uid = _.findIndex(users, (o) => {
        return o.name === userName;
      });
      const room = rooms.getRoomByName(channelID);
      if (uid !== -1 && room) {
        room.setPlayer(userName);
        users[uid].room = channelID;
        socket.join(channelID);
        socket.broadcast.to(channelID).emit('wait for others update', room.getProperty());
      }
    });

    socket.on('leave room', (channelID, user) => {

    });


    socket.on('ready to play', channelID => {
      const room = rooms.getRoomByName(channelID);
      if (room) {
        room.setStart(true);
        socket.broadcast.to(channelID).emit('wait for others update', room.getProperty());
        setTimeout(() => {
          room.setPlay(true);
          io.in(channelID).emit('start game', room.getProperty());
        }, 1000);
      }
    });
    socket.on('get store', () => {
      socket.emit('data', users);
    });

    socket.on('get question', (channelID, category, type ) => {
      const randomQuestion = question.getRandomQuestion(category, type);
      io.in(channelID).emit('choose category update', randomQuestion);
    });

    socket.on('category choosed', (channelID, category) => {
      const room = rooms.getRoomByName(channelID);
      if (room) {
        room.setQuestion(question.getRandomQuestion(category));
        console.log('=========');
        console.log(room.getProperty());
        console.log('=========');
        // room.pushRound({
        //   question: question.getRandomQuestion(category),
        //   time: Math.floor(Date.now() / 1000),
        //   elapsedTime:
        // });
        io.in(channelID).emit('room update', room.getProperty());
      }
    });

    socket.on('join channel', (channel) => {
      socket.join(channel.name);
    });

    socket.on('player ready', (name, channelID) => {
      const room = rooms.getRoomByName(channelID);
      if (room) {
        room.setPlayersReady(name);
        socket.join(channelID);
        socket.broadcast.to(channelID).emit('wait for others update', room.getProperty());
      }
    });

    socket.on('disconnect', function() {
      // delete user[socket.id];
    });
  });
}
