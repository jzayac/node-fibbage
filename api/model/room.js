'use strict'

const _ = require('lodash');
const RoomProperty = require('../../utils/RoomProperty');

function Room() {
  const that = {};
  const room = [];

  that.createRoom = (roomName) => {
    const NewRoom = new RoomProperty({
      name: roomName,
      players: [],
      ready: [],
      playing: false,
      starting: false,
      round: [],
    });
    room.push(NewRoom);
    return NewRoom;
  }

  function findRoomByName(roomName) {
    const rid = _.findIndex(room, (o) => {
      return o.getName() === roomName;
    });
    return room[rid];
  }

  that.getRoomByName = (roomName) => {
    return findRoomByName(roomName);
  }

  that.getRooms = () => {
    return room.map((obj) => {
      return obj.getProperty();
    });
  }
  return that;
}
module.exports = Room();
