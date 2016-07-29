'use strict'

const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({status: 'ok'});
});

router.post('/login', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  if (!req.session || name) {
    req.session.user = {
      name: name,
    }
  }
  res.status(200).json({
    data: req.body,
    session: req.session,
  })
});

router.get('/logout', (req, res) => {
  req.session.user = null;
});

module.exports = router;
