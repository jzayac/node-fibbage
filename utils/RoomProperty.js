const _ = require('lodash');

function remainingTime (time) {

}

function RoomProperty(roomProps) {
  this.room = roomProps;
}

RoomProperty.prototype.getProperty = function() {
  return this.room;
}

RoomProperty.prototype.getName = function() {
  return this.room.name;
}

RoomProperty.prototype.getPlayers = function() {
  return this.room.players;
}

RoomProperty.prototype.getPlayers = function() {
  return this.room.players;
}


RoomProperty.prototype.setStart = function(start) {
  this.room.starting = start;
}

RoomProperty.prototype.setPlayer = function(playerName) {
  this.room.players.push({
    name: playerName
  });
}

RoomProperty.prototype.setQuestion = function(question) {
  this.room.round.push({
    question: question,
    time: Math.floor(Date.now() / 1000),
    remainingTime: 35,
  });
}

RoomProperty.prototype.setPlay = function(play) {
  this.room.playing = play;
}

RoomProperty.prototype.setPlayersReady = function(playerName) {
  this.room.ready.push(playerName);
  const idx = _.findIndex(this.room.players, (o) => o.name === playerName );
  this.room.players[idx].ready = true;
}

RoomProperty.prototype.pushRound = function(round) {
  this.room.round.push(round);
}

RoomProperty.prototype.updateRoom = function(room) {
  this.room = room;
  return this.room;
}

RoomProperty.prototype.isStarting = function() {
  return this.room.starting;
}

// RoomProperty.prototype.remainingTime = function() {
//   const time = this.room.round.length && this.room.round[this.room.round.legnth -1].time
// }

module.exports = RoomProperty;
