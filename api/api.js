'use strict'

const express = require('express');
const config = require('../config/config');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SocketIo = require('socket.io');

const app = express();
app.use(morgan('dev'));
// app.use(cookieParser());
app.use(session({
  secret: 'node fibbage',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

app.get('/' , (req, res) => {
  res.send({
    message: 'hello world',
  });
});

app.post('/teste', (req, res) => {
  res.status(200).json({
    data: req.body,
    session: req.session,
  })
});

app.use('/user', userRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'not found'});
});

app.listen(config.apiPort, () => {
    console.log('Api listening on port ' + config.apiPort);
});
