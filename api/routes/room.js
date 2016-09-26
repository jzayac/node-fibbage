'use strict'

const express = require('express');

const router = express.Router();
const rooms = require('../model/room');
const validate = require('../../utils/validation');
const _ = require('lodash');
const isAuthenticated = require('../utils/isAuthenticated');


router.get('/', isAuthenticated, (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: rooms.getRooms(),
  })
});

router.get('/id/:id', isAuthenticated, (req, res) => {
  const room = rooms.getRoomByName(req.params.id);
  if (room) {
    return res.status(200).json({
      status: 'ok',
      data: room.getProperty(),
    });
  }
  return res.status(404).json({
    error: 'not found',
  });
});

router.post('/', isAuthenticated, (req, res) => {
  const room = req.body.name;
  const error = validate(room, 'room name').isRequired().isString().unique(rooms.getRooms(), 'name').exec();
  if (error) {
    return res.status(400).json({error: error});
  }
  const newRoom = rooms.createRoom(room).getProperty();
  res.status(200).json({
    status: 'ok',
    data: newRoom,
  });
});

module.exports = router;
