'use strict'

const express = require('express');

let router = express.Router();
const rooms = require('../model/room');
const validate = require('../../utils/validation');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: rooms,
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  const room = req.body.name;
  // rooms.push(req.body.room);
  const error = validate(room, 'room name').isRequired().isString().unique(rooms, 'name').exec();
  if (error) {
    return res.status(400).json({error: error});
  }
  rooms.push({
    name: room,
    players: {},
  });
  res.status(200).json({
    status: 'ok',
    data: rooms,
  });
});

module.exports = router;
