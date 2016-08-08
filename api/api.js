'use strict'

const express = require('express');
const config = require('../config/config');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
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
app.use(bodyParser.urlencoded({
  extended: true,
}));
// app.use(bodyParser.json());

const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');

app.get('/' , (req, res) => {
  res.send({
    message: 'hello world',
  });
});

// app.post('/teste', (req, res) => {
//   res.status(200).json({
//     data: req.body,
//     session: req.session,
//   })
// });

app.use('/user', userRouter);

app.use((req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({ status: 'not found'});
});

// app.listen(config.apiPort, () => {
//     console.log('Api listening on port ' + config.apiPort);
// });

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });
//
  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
