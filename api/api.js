'use strict'

const express = require('express');
const config = require('../config/config');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const questionRouter = require('./routes/question');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const SocketIo = require('socket.io');
const socketEvents = require('./socket');

const app = express();
app.use(morgan('dev'));
// app.use(cookieParser());
app.use(session({
  secret: 'node fibbage',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
// app.use(bodyParser.urlencoded({
//   extended: true,
// }));
app.use(bodyParser.json());

const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');

app.get('/' , (req, res) => {
  res.send({
    message: 'hello world',
  });
});

app.use('/user', userRouter);
app.use('/room', roomRouter);
app.use('/question', questionRouter);


app.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({ status: 'not found'});
});

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  socketEvents(io);
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
