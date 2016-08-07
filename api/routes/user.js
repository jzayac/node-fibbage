'use strict'

const express = require('express');
const _ = require('lodash');
let router = express.Router();
const users = [];


router.get('/', (req, res) => {
  res.status(200).json({status: 'ok'});
});

router.post('/login', (req, res) => {
  const name = req.body.name;

  if (!req.session || name) {
    req.session.user = {
      name: name,
      points: 0,
    }
  }
  res.status(200).json({
    data: req.body,
    session: req.session,
  });
});

router.get('/logout', (req, res) => {
  req.session.user = null;
});

module.exports = router;
