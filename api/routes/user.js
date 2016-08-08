'use strict'

const express = require('express');
// const _ = require('lodash');
let router = express.Router();
const validate = require('../../utils/validation');
const users = [];


router.get('/', (req, res) => {
  res.status(200).json({status: 'ok'});
});

router.post('/login', (req, res) => {
  const name = req.body.name;
  const error = validate(name, 'nick name').isRequired().isString().unique(users, 'name').exec();
  if (error) {
    return res.status(400).json({error: error});
  }
  req.session.user = {
    name: name,
  };
  users.push = {
    name: name,
    points: 0,
  };

  res.status(200).json({
    data: req.body,
  });
});

router.get('/loadauth', (req, res) => {
  if (!req.session) {
    return res.status(200).json({});
  } else {
    return res.status(200).json({
      data: req.session.user,
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
});

module.exports = router;
