// import * as channelActions from '../redux/modules/channel';

export default (io) => {
  io.on('news', (data) => {
    io.emit('my other event', { my: 'data from client' });
  });

  io.on('msg', (data) => {
    console.log(data);
  });

  io.on('error', (error) => {
    console.error('SOCKET error :' + error);
  });

  // io.on('join channel', (channel) => {
  //   io.join(channel.name);
  // });

  // io.emit('user/login', { user: 'name' });
};
