'use strict'

const express = require('express');
let router = express.Router();
const validate = require('../../utils/validation');
const users = require('../model/user');


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

  users.push({
    name: name,
    points: 0,
  });

  res.status(200).json({
    data: req.body,
  });
});

router.get('/loadauth', (req, res) => {
  if (!req.session) {
    console.log('empty');
    return res.status(200).json({});
  } else {
    console.log('not empty');
    console.log(req.session.user);
    return res.status(200).json({
      data: req.session.user,
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
});

module.exports = router;
