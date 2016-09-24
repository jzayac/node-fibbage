'use strict'

const users = require('../model/user');
const rooms = require('../model/room');
const question = require('../model/question');
const _ = require('lodash');

// console.log(question.getRandomQuestion());
// console.log(question.getRandomCategory());

module.exports = function(io) {
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
      rooms.push({
        name: room,
        players: [],
        ready: [],
        playing: false,
        starting: false,
        round: [],
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
        rooms[rid].players.push({ name: userName });
        users[uid].room = channelID;
        socket.join(channelID);
        socket.broadcast.to(channelID).emit('wait for others update', rooms[rid]);
      }
      // socket.broadcast.emit('player join' )
    });
    socket.on('leave room', (channelID, user) => {

    });


    socket.on('ready to play', channelID => {
      const rid = _.findIndex(rooms, (o) => {
        return o.name === channelID;
      });
      if (rid !== -1) {
        rooms[rid].starting = true;
        socket.broadcast.to(channelID).emit('wait for others update', rooms[rid]);
        setTimeout(() => {
          console.log('TIMEOUT ended');
          rooms[rid].playing = true;
          // socket.broadcast.to(channelID).emit('start game', rooms[rid]);
          io.in(channelID).emit('start game', rooms[rid]);
          // io.broadcast.to(channelID).emit('start game', rooms[rid]);
        }, 1000);
      }
    });
    socket.on('get store', () => {
      console.log(users);
      socket.emit('data', users);
    });

    // socket.on('get question category', () => {
    //   const randomCategory = question.getRandomCategory(10);
    //   socket.emit('choose category update', randomCategory);
    // });

    socket.on('get question', (channelID, category, type ) => {
      const randomQuestion = question.getRandomQuestion(category, type);
      io.in(channelID).emit('choose category update', randomQuestion);
    });

    socket.on('join channel', (channel) => {
      socket.join(channel.name);
    });

    socket.on('player ready', (name, channelID) => {
      const rid = _.findIndex(rooms, (o) => {
        return o.name === channelID;
      });

      if (rid !== -1) {
        rooms[rid].ready.push(name);
        const idx = _.findIndex(rooms[rid].players, (o) => o.name === name );
        rooms[rid].players[idx].ready = true;
        socket.join(channelID);
        socket.broadcast.to(channelID).emit('wait for others update', rooms[rid]);
      }
    });
    // socket.on('new player ready', )

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
