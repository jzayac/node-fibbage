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
    data: rooms,
  })
});

router.get('/id/:id', isAuthenticated, (req, res) => {
  console.log('call id');
  const idx = _.findIndex(rooms, (o) => {
    return o.name === req.params.id;
  });
  if (idx !== -1) {
    return res.status(200).json({
      status: 'ok',
      data: rooms[idx],
    });
  }
  return res.status(404).json({
    error: 'not found',
  });
});

router.post('/', isAuthenticated, (req, res) => {
  const room = req.body.name;
  const error = validate(room, 'room name').isRequired().isString().unique(rooms, 'name').exec();
  if (error) {
    return res.status(400).json({error: error});
  }
  rooms.push({
    name: room,
    players: [],
    ready: [],
  });
  console.log(rooms);
  res.status(200).json({
    status: 'ok',
    data: rooms,
  });
});

module.exports = router;
