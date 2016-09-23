'use strict'

const express = require('express');
let router = express.Router();
const validate = require('../../utils/validation');
const users = require('../model/user');
const _ = require('lodash');


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
    room: undefined,
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
    const uid = _.findIndex(users, (o) => {
      return o.name === req.session.user;
    });
    console.log('not empty');
    console.log(req.session.user);
    console.log(users[uid]);
    // return res.status(200).json({
    //   data: req.session.user,
    // });
    return res.status(200).json({
      data: users[uid],
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
});

module.exports = router;
