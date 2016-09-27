'use strict'

const express = require('express');

const router = express.Router();
const question = require('../model/question');
const room = require('../model/room');
const isAuthenticated = require('../utils/isAuthenticated');

router.get('/category', isAuthenticated, (req, res) => {
  const randomCategory = question.getRandomCategory(10);
  res.status(200).json({
    status: 'ok',
    data: randomCategory,
  })
});

router.get('/category/:type', isAuthenticated, (req, res) => {
  const randomCategory = question.getRandomCategory(10, req.params.type);
  res.status(200).json({
    status: 'ok',
    data: randomCategory,
  });
});


// router.get('/time/:channelID', isAuthenticated, (req, res) => {
//
// });

module.exports = router;
